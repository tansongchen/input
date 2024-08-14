import { defineConfig } from "vitepress";

const fileAndStyles: Record<string, string> = {};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "众妙斋 · 输入方案集锦",
  description: "输入方案集锦",
  appearance: "force-auto",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "冰雪四拼", link: "/snow" },
      { text: "落萧双拼", link: "/leaf" },
      { text: "C 形音", link: "/c" },
    ],

    sidebarMenuLabel: "目录",
    returnToTopLabel: "返回顶部",
    outline: {
      label: "大纲",
    },
    sidebar: [
      {
        text: "冰雪四拼",
        items: [
          { text: "简介", link: "/snow/index" },
          { text: "基本输入", link: "/snow/basic" },
          { text: "高级功能", link: "/snow/advanced" },
          { text: "评测数据", link: "/snow/evaluation" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/tansongchen/input" },
    ],
  },
  vite: {
    ssr: {
      noExternal: ["naive-ui", "date-fns", "vueuc"],
    },
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
      return code.replace(/<\/head>/, style + "</head>");
    }
  },
});
