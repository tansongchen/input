import { 同步, 扫描全部 } from "./simulator";

// 默认增量模拟，只补充新出现的按键序列；方案本身有改动时用 --force 全部重新模拟
const 失败 = 同步(扫描全部(), process.argv.includes("--force"));
console.log(失败.length ? `${失败.length} 条模拟失败` : "模拟结果已是最新");
if (失败.length) process.exit(1);
