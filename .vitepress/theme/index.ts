// .vitepress/theme/index.js

import { defineComponent, h, inject } from "vue";
import DefaultTheme from "vitepress/theme";
import { NConfigProvider } from "naive-ui";
import { setup } from "@css-render/vue3-ssr";
import { useRoute } from "vitepress";
import "./custom.css";

const { Layout } = DefaultTheme;

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject("css-render-collect") as any;
    return {
      style: collect(),
    };
  },
  render() {
    return h("css-render-style", {
      innerHTML: this.style,
    });
  },
});

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute();
    return () => {
      return h("vitepress-path", null, [route.path]);
    };
  },
});

const NaiveUIProvider = defineComponent({
  render() {
    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true },
      {
        default: () => [
          h(Layout, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null,
        ],
      },
    );
  },
});

export default {
  extends: DefaultTheme,
  Layout: NaiveUIProvider,
  enhanceApp: ({ app }) => {
    if (import.meta.env.SSR) {
      const { collect } = setup(app);
      app.provide("css-render-collect", collect);
    }
    // 把方案变量暴露为全局属性，模板里可以直接写 {{ 方案 }} 而不是 {{ $frontmatter.方案 }}
    const 全局属性 = app.config.globalProperties;
    for (const 变量 of ["方案", "横"]) {
      Object.defineProperty(全局属性, 变量, {
        get: () => 全局属性.$frontmatter?.[变量],
      });
    }
  },
};
