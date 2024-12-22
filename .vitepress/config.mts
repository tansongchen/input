import { defineConfig } from "vitepress";

const fileAndStyles: Record<string, string> = {};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "众妙斋 · 冰雪输入法",
  description: "冰雪输入法",
  appearance: "force-auto",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "冰雪四拼", link: "/snow4" },
      { text: "冰雪三拼", link: "/snow3" },
      { text: "冰雪双拼", link: "/snow2" },
      { text: "冰雪一拼", link: "/snow1" },
    ],

    sidebarMenuLabel: "目录",
    returnToTopLabel: "返回顶部",
    outline: {
      label: "大纲",
    },
    sidebar: [
      {
        text: "冰雪四拼",
        link: "/snow4/index",
        items: [
          { text: "基本输入", link: "/snow4/basic" },
          { text: "高级功能", link: "/snow4/advanced" },
          { text: "评测数据", link: "/snow4/evaluation" },
        ],
      },
      {
        text: "冰雪三拼",
        link: "/snow3/index",
        items: [
          { text: "基本输入", link: "/snow3/basic" },
          { text: "高级功能", link: "/snow3/advanced" },
          { text: "评测数据", link: "/snow3/evaluation" },
        ]
      },
      {
        text: "冰雪双拼",
        link: "/snow2/index",
        items: []
      },
      {
        text: "冰雪一拼",
        link: "/snow1/index",
        items: []
      },
    ],

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
