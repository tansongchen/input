import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { 方案列表 } from "../.vitepress/方案";

// 导出工具一次运行只产生一个 PDF，因此每个方案各跑一次
const 根目录 = fileURLToPath(new URL("..", import.meta.url));
const 命令 = fileURLToPath(
  new URL("../node_modules/.bin/press-export-pdf", import.meta.url),
);

for (const [目录, 名称] of Object.entries(方案列表)) {
  console.log(`\n正在导出《${名称}》……`);
  const { status, error } = spawnSync(命令, ["export", "."], {
    cwd: 根目录,
    stdio: "inherit",
    env: { ...process.env, SNOW_SCHEME: 目录 },
  });
  if (error) throw error;
  if (status !== 0) process.exit(status ?? 1);
}
