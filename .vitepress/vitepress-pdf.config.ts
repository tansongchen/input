// .vitepress/vitepress-pdf.config.ts
import { defineUserConfig } from "vitepress-export-pdf";
import { 方案列表 } from "./方案";

// 各方案内部页面的先后顺序，方案中不存在的页面自动跳过
const 页面顺序 = [
  "index",
  "spelling",
  "basic",
  "advanced",
  "evaluation",
  "practice",
];

// 一次运行只导出一个方案，由 SNOW_SCHEME 指定；src/export.ts 会遍历全部方案
const 目录 = process.env.SNOW_SCHEME ?? "snow4";
if (!(目录 in 方案列表)) {
  throw new Error(`SNOW_SCHEME 不是已知的方案目录：${目录}`);
}

const 序号 = (路径: string) => {
  const 文件名 = 路径.split("/").pop() ?? "";
  const i = 页面顺序.indexOf(文件名.replace(/\.html$/, ""));
  return i === -1 ? 页面顺序.length : i;
};

export default defineUserConfig({
  // multimatch 按顺序求并集与差集：先排除全部路由，再只加回当前方案的页面
  routePatterns: ["!/**", `/${目录}/*`],
  urlOrigin: "https://input.tansongchen.com",
  outDir: "pdf",
  outFile: `${方案列表[目录]}.pdf`,
  sorter: (a, b) => 序号(a.path) - 序号(b.path) || a.path.localeCompare(b.path),
});
