import yaml from "@modyfi/vite-plugin-yaml";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { defineConfig } from "vitepress";
import { 模拟插件 } from "../src/simulator";

const fileAndStyles: Record<string, string> = {};
const wasmPath = "node_modules/fcitx5-rime/dist/";

// 各方案的变量，按目录注入到 frontmatter 中，供 components/ 下的公共片段引用
const 方案变量: Record<string, Record<string, string>> = {
  snow1: { 方案: "yipin", 横: "e" },
  snow3: { 方案: "sanpin", 横: "v" },
  snow4: { 方案: "sipin", 横: "e" },
  "snow-jiandao": { 方案: "jiandao", 横: "v" },
  "snow-qingyun": { 方案: "qingyun", 横: "e" },
  "snow-feihua": { 方案: "feihua", 横: "e" },
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "众妙斋 · 冰雪拼音",
  description: "冰雪拼音",
  srcExclude: ["components/**"],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "冰雪之道", link: "/philosophy" },
      { text: "冰雪奇缘", link: "/snow" },
      { text: "冰雪四拼", link: "/snow4/" },
      { text: "冰雪三拼", link: "/snow3/" },
      { text: "冰雪二拼", link: "/snow2/" },
      { text: "冰雪一拼", link: "/snow1/" },
      { text: "冰雪键道", link: "/snow-jiandao/" },
      { text: "冰雪清韵", link: "/snow-qingyun/" },
      { text: "冰雪飞花", link: "/snow-feihua/" },
      { text: "工具", items: [{ text: "冰雪注音", link: "/pronunciation" }] },
    ],

    sidebarMenuLabel: "目录",
    returnToTopLabel: "返回顶部",
    outline: {
      label: "大纲",
    },
    sidebar: {
      "/": [
        {
          text: "冰雪之道",
          link: "/philosophy",
          items: [],
        },
        { text: "冰雪奇缘", link: "/snow", items: [] },
        {
          text: "冰雪四拼",
          link: "/snow4/",
          items: [
            { text: "拼写规则", link: "/snow4/spelling" },
            { text: "顶功编码", link: "/snow4/basic" },
            { text: "高级功能", link: "/snow4/advanced" },
            { text: "评测数据", link: "/snow4/evaluation" },
            { text: "练习指南", link: "/snow4/practice" },
          ],
        },
        {
          text: "冰雪三拼",
          link: "/snow3/",
          items: [
            { text: "拼写规则", link: "/snow3/spelling" },
            { text: "顶功编码", link: "/snow3/basic" },
            { text: "高级功能", link: "/snow3/advanced" },
          ],
        },
        {
          text: "冰雪二拼",
          link: "/snow2/",
          items: [],
        },
        {
          text: "冰雪一拼",
          link: "/snow1/",
          items: [
            { text: "拼写规则", link: "/snow1/spelling" },
            { text: "顶功编码", link: "/snow1/basic" },
            { text: "高级功能", link: "/snow1/advanced" },
          ],
        },
        {
          text: "冰雪键道",
          link: "/snow-jiandao/",
          items: [
            { text: "顶功编码", link: "/snow-jiandao/basic" },
            { text: "高级功能", link: "/snow-jiandao/advanced" },
          ],
        },
        {
          text: "冰雪飞花",
          link: "/snow-feihua/",
          items: [
            { text: "拼写规则", link: "/snow-feihua/spelling" },
            { text: "前缀编码", link: "/snow-feihua/basic" },
          ],
        },
        {
          text: "冰雪清韵",
          link: "/snow-qingyun/",
          items: [
            { text: "拼写规则", link: "/snow-qingyun/spelling" },
            { text: "前缀编码", link: "/snow-qingyun/basic" },
            { text: "高级功能", link: "/snow-qingyun/advanced" },
            { text: "评测数据", link: "/snow-qingyun/evaluation" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/tansongchen/input" },
    ],

    footer: {
      message: "采用 VitePress 构建",
      copyright: `© 2015 - ${new Date().getFullYear()} 谭淞宸`,
    },
  },
  vite: {
    ssr: {
      noExternal: ["naive-ui", "date-fns", "vueuc", "fcitx5-rime"],
    },
    optimizeDeps: {
      exclude: ["fcitx5-rime"],
    },
    plugins: [
      viteStaticCopy({
        targets: [
          "Fcitx5.js",
          "Fcitx5.wasm",
          "libFcitx5Config.so",
          "libFcitx5Core.so",
          "libFcitx5Utils.so",
        ].map((file) => ({
          src: wasmPath + file,
          dest: "assets/chunks",
        })),
      }),
      yaml(),
      模拟插件(),
    ],
  },
  transformPageData(pageData) {
    const 目录 = pageData.relativePath.split("/")[0];
    return {
      frontmatter: { ...方案变量[目录], ...pageData.frontmatter },
    };
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/;
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/;
    const style = styleRegex.exec(context.content)?.[1];
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1];
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style;
    }
    context.content = context.content.replace(styleRegex, "");
    context.content = context.content.replace(vitepressPathRegex, "");
  },
  transformHtml(code, id) {
    const html = id.split("/").pop();
    if (!html) return;
    const style = fileAndStyles[`/${html}`];
    if (style) {
      return code.replace(/<\/head>/, `${style}</head>`);
    }
  },
  markdown: {
    math: true,
  },
});
