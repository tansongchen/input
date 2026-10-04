import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Plugin } from "vite";
import type { 候选框状态 } from "./utils";

/** 扫描 Markdown 时跳过的目录 */
const 忽略目录 = new Set([
  "node_modules",
  ".git",
  ".vitepress",
  "build",
  "dist",
  "public",
]);

/** 匹配 <Window input="方案名:按键序列" /> 中字面写出的 input 属性 */
const 字面正则 = /<Window\s[^>]*?(?<=\s)input="([^"]*)"/g;

/**
 * 匹配 <script setup> 中形如 const 输入XX = "方案名:按键序列" 的声明。约定所有
 * 以「输入」开头的常量都是 <Window :input="输入XX" /> 的按键序列，这样片段里
 * 用变量写的 input 也能被扫描到——无需解析 @include 关系，因为变量和引用分处
 * 不同文件，而只要声明被扫描到，模拟结果就在 simulation.json 里。
 */
const 声明正则 = /\bconst\s+输入[\p{L}\p{N}_$]*\s*=\s*"([^"\n]*)"/gu;

/** glog 的 ERROR/FATAL 日志，形如 "E20261002 17:54:38.484678 0x16b level_db.cc:259] 内容" */
const 日志正则 = /^[EF]\d{8} [\d:.]+ \S+ (.*)$/gm;

/** 项目根目录，从这里递归扫描 Markdown */
const 根目录 = process.cwd();

/** 方案目录，作为 rime_api_console 的用户目录 */
const 方案目录 = resolve(根目录, "../rime-snow-pinyin");

/** 模拟结果的输出路径 */
const 输出路径 = resolve(根目录, "src/simulation.json");

/**
 * 启动 rime_api_console，以方案目录为用户目录，选择方案后发送按键序列，
 * 返回该按键序列执行后的上屏文字和候选框状态。
 */
export function 模拟(方案: string, 按键序列: string[]): 候选框状态 {
  // 清掉上一次模拟留下的用户数据，否则动态调频会让结果取决于模拟的顺序
  const 用户词典 = readdirSync(方案目录).filter((项) => 项.endsWith(".userdb"));
  for (const 项 of [...用户词典, "user.yaml", "installation.yaml"]) {
    rmSync(join(方案目录, 项), { recursive: true, force: true });
  }
  const 进程 = spawnSync("rime_api_console", [], {
    cwd: 方案目录,
    input: [`select schema ${方案}`, ...按键序列, "exit", ""].join("\n"),
    encoding: "utf-8",
  });
  if (进程.error) throw 进程.error;
  if (进程.status !== 0) {
    throw new Error(`rime_api_console 异常退出：${进程.stderr}`);
  }
  // rime 遇到用户词典被占用、Lua 报错之类的问题时并不会非零退出，只在 stderr 留下
  // ERROR 日志，而候选会静默变空、按键被当作原始输入上屏。把这些日志视为模拟失败，
  // 否则看起来合法的坏结果会被写进缓存，之后不再重新模拟
  const 日志 = [...(进程.stderr ?? "").matchAll(日志正则)];
  const 错误 = [...new Set(日志.map((组) => 组[1].trim()))];
  if (错误.length) {
    // 用户词典是独占锁，被输入法本体或残留的 rime_api_console 占着时整条模拟都不可信
    const 提示 = 错误.some((行) => 行.includes("LOCK"))
      ? "\n用户词典被其他 rime 实例占用，关闭后重试"
      : "";
    throw new Error(`rime 报错：\n${错误.join("\n")}${提示}`);
  }
  // 行编辑器对每一个输入行的回显都以 \r 开头，据此把输出切分成段：
  // 第 0 段是初始化输出，第 i 段是第 i 个输入行的输出
  const 段: string[][] = [[]];
  for (const 行 of 进程.stdout.split("\n")) {
    if (行.includes("\r")) 段.push([]);
    else 段.at(-1)!.push(行);
  }
  const 输出 = 段[1 + 按键序列.length];
  if (!输出) throw new Error(`无法解析输出：\n${进程.stdout}`);
  return 解析(输出);
}

/** 把 rime_api_console 的一段输出解析成候选框状态 */
function 解析(输出: string[]): 候选框状态 {
  const 结果: 候选框状态 = {
    commit: "",
    buffer: "",
    prompt: "",
    unused: "",
    candidates: [],
    selectedIndex: -1,
  };
  const metas = ["message: ", "updated option: ", "schema: ", "status: "];
  const 行列: string[] = [];
  for (const 行 of 输出) {
    // 一个按键序列可能多次上屏，依次拼接
    if (行.startsWith("commit: ")) 结果.commit += 行.slice("commit: ".length);
    else if (!metas.some((meta) => 行.startsWith(meta))) 行列.push(行);
  }
  // 第一行是编辑区，其余是候选
  const [编辑区 = "", ...候选区] = 行列;
  if (编辑区 !== "(not composing)") {
    const 光标 = 编辑区.indexOf("|");
    结果.unused = 编辑区.slice(光标 + 1);
    if (/\[.+\]/.test(编辑区)) {
      // 带提示的编辑区形如 "bi[xou]|"
      const 开始 = 编辑区.indexOf("[");
      const 结束 = 编辑区.lastIndexOf("]");
      结果.buffer = 编辑区.slice(0, 开始);
      结果.prompt = 编辑区.slice(开始 + 1, 结束);
    } else {
      结果.buffer = 编辑区.slice(0, 光标);
    }
  }
  for (const 行 of 候选区) {
    // 高亮的候选形如 "1. [冰雪]📌"，其余形如 "2. 必修 📌"
    const 匹配 = 行.match(/^\d+\. ([[ ])(.*)$/);
    if (!匹配) continue;
    const 高亮 = 匹配[1] === "[";
    const 分隔 = 匹配[2].indexOf(高亮 ? "]" : " ");
    if (高亮) 结果.selectedIndex = 结果.candidates.length;
    结果.candidates.push({
      text: 匹配[2].slice(0, 分隔),
      comment: 匹配[2].slice(分隔 + 1),
    });
  }
  return 结果;
}

/** 读取单个 Markdown 文件中出现过的 key，含字面量与「输入XX」常量声明 */
function 扫描(文件: string): Set<string> {
  const 内容 = readFileSync(文件, "utf-8");
  const input = new Set<string>();
  for (const 正则 of [字面正则, 声明正则]) {
    for (const 匹配 of 内容.matchAll(正则)) input.add(匹配[1]);
  }
  return input;
}

/** 递归扫描目录下所有 Markdown 文件，返回文件到其中出现过的 key 的映射 */
export function 扫描全部(目录 = 根目录, 索引 = new Map<string, Set<string>>()) {
  for (const 项 of readdirSync(目录, { withFileTypes: true })) {
    const 路径 = join(目录, 项.name);
    if (项.isDirectory()) {
      if (!忽略目录.has(项.name)) 扫描全部(路径, 索引);
    } else if (项.name.endsWith(".md")) 索引.set(路径, 扫描(路径));
  }
  return 索引;
}

/**
 * 把索引中的 key 同步到输出文件：已有结果直接复用（除非强制重新模拟），缺失的
 * 调用 rime_api_console 模拟，不再被引用的丢弃。模拟失败的 key 会被跳过而非中断，
 * 新增、失败与写入情况直接打印，返回模拟失败的 key。
 */
export function 同步(索引: Map<string, Set<string>>, 强制 = false): string[] {
  let 原内容 = "";
  try {
    原内容 = readFileSync(输出路径, "utf-8");
  } catch {
    // 首次生成时输出文件尚不存在
  }
  let 缓存: Record<string, 候选框状态> = {};
  try {
    if (!强制) 缓存 = JSON.parse(原内容);
  } catch {
    // 输出文件损坏时全部重新模拟
  }
  const 结果: Record<string, 候选框状态> = {};
  const 失败: string[] = [];
  const input = [...索引.values()].flatMap((集合) => [...集合]);
  for (const key of [...new Set(input)].sort()) {
    if (缓存[key]) {
      结果[key] = 缓存[key];
      continue;
    }
    const [方案, ...按键序列] = key.split(":");
    try {
      结果[key] = 模拟(`snow_${方案}`, 按键序列);
      console.log(`[模拟] 已模拟 ${key}`);
    } catch (错误) {
      失败.push(key);
      const 原因 = 错误 instanceof Error ? 错误.message : 错误;
      console.warn(`[模拟] ${key} 模拟失败：${原因}`);
    }
  }
  const 内容 = `${JSON.stringify(结果, null, 2)}\n`;
  // 内容没有变化时不写入，以免触发无谓的热更新
  if (内容 !== 原内容) {
    writeFileSync(输出路径, 内容);
    console.log(`[模拟] 已写入 ${输出路径}`);
  }
  return 失败;
}

/** 两个 key 集合是否一致，用于判断一个文件的变化是否影响模拟 */
const 指纹 = (集合: Set<string>) => [...集合].sort().join("\n");

/**
 * 扫描 Markdown 中的 <Window input="..." /> 与 <Window :input="输入XX" />，为其中
 * 的按键序列生成模拟结果。开发时监听 Markdown 的增删改，增量补充新出现的按键序列
 * 并清理不再引用的；输出文件被 Window 组件直接 import，写入后由 Vite 自行热更新。
 */
export function 模拟插件(): Plugin {
  // 文件 -> 该文件中出现的 key，用于单个文件变化时重新计算全部 key
  let 索引 = new Map<string, Set<string>>();
  const 执行 = () => {
    try {
      同步(索引);
    } catch (错误) {
      // 开发时不因模拟失败中断服务
      console.warn(`[模拟] 同步失败：${错误}`);
    }
  };

  return {
    name: "snow:simulation",
    buildStart() {
      索引 = 扫描全部();
      执行();
    },
    configureServer(服务器) {
      const 变更 = (文件: string) => {
        if (!文件.endsWith(".md")) return;
        const 旧 = 索引.get(文件);
        const input = 扫描(文件);
        索引.set(文件, input);
        if (!旧 || 指纹(旧) !== 指纹(input)) 执行();
      };
      const 删除 = (文件: string) => {
        if (索引.delete(文件)) 执行();
      };
      服务器.watcher.on("add", 变更);
      服务器.watcher.on("change", 变更);
      服务器.watcher.on("unlink", 删除);
    },
  };
}
