<script setup lang="ts">
import type { FCITX } from "fcitx5-rime";
import { useData } from "vitepress";
import { onMounted, onUnmounted, useTemplateRef } from "vue";

interface FcitxWindow extends Window {
  fcitx?: FCITX;
}

const { frontmatter } = useData();
const textarea = useTemplateRef("textarea");

let active = false;
let loaded = false;

const disableFcitx = () => {
  (window as FcitxWindow).fcitx?.disable();
};

// 所有方案打包在同一个 zip 中，聚焦时通过 Rime 的方案菜单切换到当前页面的方案
const selectSchema = () => {
  const fcitx = (window as FcitxWindow).fcitx;
  if (!loaded || !fcitx) return;
  const rime = fcitx.getMenuActions()[0];
  if (!rime || rime.desc === frontmatter.value.名称) return;
  const schema = rime.children?.find(
    (action) => action.desc === frontmatter.value.名称,
  );
  if (schema) fcitx.activateMenuAction(schema.id);
};

onMounted(() => {
  active = true;
  void import("fcitx5-rime").then(async ({ loadZip }) => {
    if (!active) return;

    await loadZip("/snow-pinyin-build.zip");
    loaded = true;
    if (!active) disableFcitx();
    else if (document.activeElement === textarea.value) selectSchema();
  });
});

onUnmounted(() => {
  active = false;
  disableFcitx();
});
</script>
<template>
  <textarea ref="textarea" @focus="selectSchema"></textarea>
</template>
<style scoped>
textarea {
  width: 100%;
  max-width: 400px;
  height: 128px;
  font-size: 1rem;
  padding: 8px;
  border: 1px solid #aaa;
  border-radius: 4px;
}
</style>
