import { spawnSync } from "child_process";
import { resolve } from "path";
import { 候选框状态 } from "./utils";

const 方案目录 = resolve(__dirname, "..");

/**
 * 启动 rime_api_console，以方案目录为用户目录，选择方案后发送按键序列，
 * 返回该按键序列执行后的上屏文字和候选框状态。
 */
function 模拟(按键序列: string, 方案?: string): 候选框状态 {
  const 输入行 = 方案 ? [`select schema ${方案}`, 按键序列] : [按键序列];
  const 进程 = spawnSync("rime_api_console", [], {
    cwd: 方案目录,
    input: [...输入行, "exit", ""].join("\n"),
    encoding: "utf-8",
  });
  if (进程.error) throw 进程.error;
  if (进程.status !== 0) {
    throw new Error(`rime_api_console 异常退出：${进程.stderr}`);
  }
  // 行编辑器对每一个输入行的回显都以 \r 开头，据此把输出切分成段：
  // 第 0 段是初始化输出，第 i 段是第 i 个输入行的输出
  const 段: string[][] = [[]];
  for (const 行 of 进程.stdout.split("\n")) {
    if (行.includes("\r")) 段.push([]);
    else 段.at(-1)!.push(行);
  }
  const 输出 = 段[输入行.length];
  if (!输出) throw new Error(`无法解析输出：\n${进程.stdout}`);
  return 解析(输出);
}

function 解析(输出: string[]): 候选框状态 {
  const 结果: 候选框状态 = {
    buffer: "",
    prompt: "",
    unused: "",
    candidates: [],
    selectedIndex: -1,
  };
  const metas = ["message: ", "updated option: ", "schema: ", "status: "];
  const 行列 = 输出.filter(
    (行) => !metas.some((meta) => 行.startsWith(meta))
  );
  let i = 0;
  const 编辑区 = 行列[i++] ?? "";
  if (编辑区 !== "(not composing)") {
    Object.assign(结果, 解析编辑区(编辑区));
  }
  for (; i < 行列.length; i++) {
    // 例如 "1. [是]📌" 或 "2.  手机 ev"
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

/**
 * 编辑区形如 "a[b]|c"：方括号内为当前选中的待转换部分，| 为光标。
 * 方括号前为已转换或已确认的部分，方括号后为尚未处理的部分。
 */
function 解析编辑区(编辑区: string) {
  const 光标 = 编辑区.indexOf("|");
  const 开始 = 编辑区.indexOf("[");
  const 结束 = 编辑区.lastIndexOf("]");
  return {
    buffer: 编辑区.slice(0, 开始),
    prompt: 编辑区.slice(开始 + 1, 结束),
    unused: 编辑区.slice(光标 + 1),
  };
}

const 按键序列 = "sfdvua4e 1";
const 方案 = "snow_sipin";
console.log(JSON.stringify(模拟(按键序列, 方案), null, 2));
