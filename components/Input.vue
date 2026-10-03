<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface FcitxWindow extends Window {
  fcitx?: {
    disable(): void;
  };
}

let active = false;

const disableFcitx = () => {
  (window as FcitxWindow).fcitx?.disable();
};

onMounted(() => {
  active = true;
  void import("fcitx5-rime").then(async ({ loadZip }) => {
    if (!active) return;

    await loadZip("/snow-pinyin-build.zip");
    if (!active) disableFcitx();
  });
});

onUnmounted(() => {
  active = false;
  disableFcitx();
});
</script>
<template>
  <textarea></textarea>
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
