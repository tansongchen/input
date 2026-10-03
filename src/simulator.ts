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

/** 匹配 <Window input="方案名:按键序列" /> 中的 input 属性 */
const 组件正则 = /<Window\s[^>]*?\binput="([^"]*)"/g;

export interface 模拟配置 {
  /** 项目根目录，从这里递归扫描 Markdown */
  根目录: string;
  /** 方案目录，作为 rime_api_console 的用户目录 */
  方案目录: string;
  /** 模拟结果的输出路径 */
  输出路径: string;
}

export function 默认配置(根目录 = process.cwd()): 模拟配置 {
  return {
    根目录,
    方案目录: resolve(根目录, "../rime-snow-pinyin"),
    输出路径: resolve(根目录, "src/simulation.json"),
  };
}

/**
 * 启动 rime_api_console，以方案目录为用户目录，选择方案后发送按键序列，
 * 返回该按键序列执行后的上屏文字和候选框状态。
 */
export function 模拟(
  方案: string,
  按键序列: string[],
  方案目录: string,
): 候选框状态 {
  for (const 项 of readdirSync(方案目录)) {
    if (项.endsWith(".userdb")) {
      rmSync(join(方案目录, 项), { recursive: true, force: true });
    }
  }
  rmSync(join(方案目录, "user.yaml"), { force: true });
  rmSync(join(方案目录, "installation.yaml"), { force: true });
  const 进程 = spawnSync("rime_api_console", [], {
    cwd: 方案目录,
    input: [`select schema ${方案}`, ...按键序列, "exit", ""].join("\n"),
    encoding: "utf-8",
  });
  if (进程.error) throw 进程.error;
  if (进程.status !== 0) {
    throw new Error(`rime_api_console 异常退出：${进程.stderr}`);
  }
  检查日志(进程.stderr ?? "");
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

/** glog 的 ERROR/FATAL 日志，形如 "E20261002 17:54:38.484678 0x16b level_db.cc:259] 内容" */
const 日志正则 = /^[EF]\d{8} [\d:.]+ \S+ (.*)$/gm;

/**
 * rime 遇到用户词典被占用、Lua 报错之类的问题时并不会非零退出，只在 stderr 留下
 * ERROR 日志，而候选会静默变空、按键被当作原始输入上屏。把这些日志视为模拟失败，
 * 否则看起来合法的坏结果会被写进缓存，之后不再重新模拟。
 */
function 检查日志(stderr: string) {
  const 错误 = [
    ...new Set([...stderr.matchAll(日志正则)].map((组) => 组[1].trim())),
  ];
  if (!错误.length) return;
  // 用户词典是独占锁，被输入法本体或残留的 rime_api_console 占着时整条模拟都不可信
  const 提示 = 错误.some((行) => 行.includes("LOCK"))
    ? "\n用户词典被其他 rime 实例占用，关闭后重试"
    : "";
  throw new Error(`rime 报错：\n${错误.join("\n")}${提示}`);
}

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
  let i = 0;
  const 编辑区 = 行列[i++] ?? "";
  if (编辑区 !== "(not composing)") {
    const 光标 = 编辑区.indexOf("|");
    结果.unused = 编辑区.slice(光标 + 1);
    if (/\[.+\]/.test(编辑区)) {
      const 开始 = 编辑区.indexOf("[");
      const 结束 = 编辑区.lastIndexOf("]");
      结果.buffer = 编辑区.slice(0, 开始);
      结果.prompt = 编辑区.slice(开始 + 1, 结束);
    } else {
      结果.buffer = 编辑区.slice(0, 光标);
    }
  }
  for (; i < 行列.length; i++) {
    const 匹配 = 行列[i].match(/^\d+\. ([[ ])(.*)$/);
    if (!匹配) continue;
    const 高亮 = 匹配[1] === "[";
    const 内容 = 匹配[2];
    const 分隔 = 内容.indexOf(高亮 ? "]" : " ");
    if (高亮) 结果.selectedIndex = 结果.candidates.length;
    结果.candidates.push({
      text: 内容.slice(0, 分隔),
      comment: 内容.slice(分隔 + 1),
    });
  }
  return 结果;
}

/** 递归遍历目录中的所有 Markdown 文件 */
function* 遍历(目录: string): Generator<string> {
  for (const 项 of readdirSync(目录, { withFileTypes: true })) {
    if (项.isDirectory()) {
      if (!忽略目录.has(项.name)) yield* 遍历(join(目录, 项.name));
    } else if (项.name.endsWith(".md")) {
      yield join(目录, 项.name);
    }
  }
}

/** 读取单个 Markdown 文件中出现过的 key */
function 扫描(文件: string): Set<string> {
  const input = new Set<string>();
  for (const 匹配 of readFileSync(文件, "utf-8").matchAll(组件正则)) {
    input.add(匹配[1]);
  }
  return input;
}

/** 扫描根目录下所有 Markdown 文件，返回文件到其中出现过的 key 的映射 */
function 扫描全部(根目录: string): Map<string, Set<string>> {
  const 索引 = new Map<string, Set<string>>();
  for (const 文件 of 遍历(根目录)) 索引.set(文件, 扫描(文件));
  return 索引;
}

/** 收集所有 Markdown 文件中出现过的 key，去重后排序 */
export function 收集(根目录: string): string[] {
  return 合并(扫描全部(根目录));
}

/** 把文件到 key 的映射合并成去重排序后的 key 列表 */
function 合并(索引: Map<string, Set<string>>): string[] {
  return [...new Set([...索引.values()].flatMap((input) => [...input]))].sort();
}

/**
 * 把 input 同步到输出文件：已有结果直接复用（除非强制重新模拟），缺失的调用
 * rime_api_console 模拟，不再被引用的丢弃。模拟失败的 key 会被跳过而非中断。
 */
export function 同步(
  input: Iterable<string>,
  配置: 模拟配置,
  强制 = false,
): { 新增: string[]; 失败: [key: string, 原因: string][]; 变化: boolean } {
  let 原内容 = "";
  try {
    原内容 = readFileSync(配置.输出路径, "utf-8");
  } catch {
    // 首次生成时输出文件尚不存在
  }
  let 缓存: Record<string, 候选框状态> = {};
  if (!强制 && 原内容) {
    try {
      缓存 = JSON.parse(原内容);
    } catch {
      // 输出文件损坏时全部重新模拟
    }
  }
  const 结果: Record<string, 候选框状态> = {};
  const 新增: string[] = [];
  const 失败: [string, string][] = [];
  for (const key of [...new Set(input)].sort()) {
    const 已有 = 缓存[key];
    if (已有) {
      结果[key] = 已有;
      continue;
    }
    const 命令列表 = key.split(":");
    const 方案 = `snow_${命令列表[0]}`;
    const 按键序列 = 命令列表.slice(1);
    try {
      结果[key] = 模拟(方案, 按键序列, 配置.方案目录);
      新增.push(key);
    } catch (错误) {
      失败.push([key, 错误 instanceof Error ? 错误.message : String(错误)]);
    }
  }
  const 内容 = `${JSON.stringify(结果, null, 2)}\n`;
  const 变化 = 内容 !== 原内容;
  if (变化) writeFileSync(配置.输出路径, 内容);
  return { 新增, 失败, 变化 };
}

function 汇报(结果: ReturnType<typeof 同步>, 输出路径: string) {
  for (const [key, 原因] of 结果.失败) {
    console.warn(`[模拟] ${key} 模拟失败：${原因}`);
  }
  if (结果.新增.length) {
    console.log(`[模拟] 新增 ${结果.新增.length} 条，已写入 ${输出路径}`);
  } else if (结果.变化) {
    console.log(`[模拟] 已更新 ${输出路径}`);
  }
}

/**
 * 扫描 Markdown 中的 <Window input="..." />，为其中的按键序列生成模拟结果。
 * 开发时监听 Markdown 的增删改，增量补充新出现的按键序列并清理不再引用的；
 * 输出文件被 Window 组件直接 import，写入后由 Vite 自行触发热更新。
 */
export function 模拟插件(选项: Partial<模拟配置> = {}): Plugin {
  const 配置 = { ...默认配置(), ...选项 };
  // 文件 -> 该文件中出现的 key，用于单个文件变化时重新计算全部 key
  let 索引 = new Map<string, Set<string>>();

  const 执行 = () => {
    try {
      汇报(同步(合并(索引), 配置), 配置.输出路径);
    } catch (错误) {
      // 开发时不因模拟失败中断服务
      console.warn(`[模拟] 同步失败：${错误}`);
    }
  };

  return {
    name: "snow:simulation",
    buildStart() {
      索引 = 扫描全部(配置.根目录);
      执行();
    },
    configureServer(服务器) {
      const 变更 = (文件: string) => {
        if (!文件.endsWith(".md")) return;
        const input = 扫描(文件);
        // key 没有变化时无需重新同步
        const 旧 = 索引.get(文件);
        if (旧?.size === input.size && [...input].every((key) => 旧.has(key))) {
          return;
        }
        索引.set(文件, input);
        执行();
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
