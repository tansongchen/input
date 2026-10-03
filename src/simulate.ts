import { 同步, 收集, 默认配置 } from "./simulator";

// 默认增量模拟，只补充新出现的按键序列；方案本身有改动时用 --force 全部重新模拟
const 强制 = process.argv.includes("--force");
const 配置 = 默认配置();
const { 新增, 失败, 变化 } = 同步(收集(配置.根目录), 配置, 强制);
for (const key of 新增) console.log(`已模拟 ${key}`);
for (const [key, 原因] of 失败) console.error(`${key} 模拟失败：${原因}`);
console.log(变化 ? `已写入 ${配置.输出路径}` : `${配置.输出路径} 无需更新`);
if (失败.length) process.exit(1);
