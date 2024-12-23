<script setup lang="ts">
import { onMounted } from "vue";
onMounted(() => {
  import("fcitx5-rime").then(({ loadZip }) => {
    loadZip("/snow-build.zip");
  });
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
