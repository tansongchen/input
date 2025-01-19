// .vitepress/vitepress-pdf.config.ts
import { defineUserConfig } from "vitepress-export-pdf";

const routes = [
  "/snow4/index.html",
  "/snow4/spelling.html",
  "/snow4/basic.html",
  "/snow4/advanced.html",
  "/snow4/evaluation.html",
  "/snow4/practice.html",
];

export default defineUserConfig({
  routePatterns: [
    "!/index.html",
    "!/README.html",
    "!/snow3/*",
    "!/snow2/*",
    "!/snow1/*",
  ],
  urlOrigin: "https://input.tansongchen.com",
  sorter: (a, b) => {
    return routes.indexOf(a.path) - routes.indexOf(b.path);
  },
});
