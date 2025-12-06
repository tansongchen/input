<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  NButton,
  NConfigProvider,
  NProgress,
  NSpace,
  NCard,
  NModal,
  NInput,
  NP,
  NH1,
  NUl,
  NLi,
  NA,
  darkTheme,
} from "naive-ui";
import { sync, theme } from "../src/utils";

interface Note {
  front: string;
  back: string;
  hint?: string;
}

const props = defineProps<{
  name: string[];
}>();
</script>
<style>
.button-container {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.front {
  font-size: 32px;
  text-align: center;
  line-height: 1;
  margin-block: 16px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.front code {
  font-size: 0.8em !important;
}

.key {
  font-size: 16px;
  text-align: center;
}

.hint {
  text-align: center;
  color: gray;
  margin-block: 16px;
  font-weight: normal;
}
</style>
<template>
  <n-config-provider :theme="theme">
    <div>
      <div v-for="char in props.name" :key="char">
        <span class="songti-text"
          >{{ char }} {{ char.codePointAt(0)?.toString(16) }}</span
        >
      </div>
    </div>
  </n-config-provider>
</template>
