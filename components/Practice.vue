<script setup lang="ts">
import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { supermemo, SuperMemoItem, SuperMemoGrade } from "supermemo";
import { computed, onMounted, ref } from "vue";
import { isEqual, shuffle } from "lodash-es";
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

const props = defineProps<{
  name: string;
  data: [string, string][];
  combo?: boolean;
}>();

interface Radical extends SuperMemoItem {
  radical: string;
  key: string;
  due: number;
}

const makeCards = () => {
  const radicals: Radical[] = props.data.map(([radical, key]) => ({
    radical,
    key,
    due: new Date().getTime(),
    interval: 1,
    repetition: 0,
    efactor: 2.5,
  }));
  return shuffle(radicals);
};

const queue = ref(
  MinPriorityQueue.fromArray<Radical>(makeCards(), (x) => x.due)
);
const hint = ref(false);
const showModal = ref(false);
const current = computed(() => queue.value.front());
const length = computed(() => queue.value.size());
const seen = computed(() => {
  return queue.value.toArray().filter((item) => item.repetition > 0).length;
});
const familiar = computed(() => {
  return queue.value.toArray().filter((item) => item.repetition > 1).length;
});
let startTime = 0;

const next = () => {
  if (queue.value.isEmpty()) return;
  startTime = performance.now();
};

const proceed = () => {
  let grade: SuperMemoGrade;
  if (hint.value) {
    hint.value = false;
    grade = 0;
  } else {
    const elapsed = performance.now() - startTime;
    if (elapsed < 600) {
      grade = 5;
    } else if (elapsed < 1000) {
      grade = 4;
    } else {
      grade = 3;
    }
  }
  const updated = supermemo(current.value, grade);
  const radical: Radical = {
    ...current.value,
    ...updated,
    due: current.value.due + updated.interval * 1000 * 60 * 60 * 24,
  };
  queue.value.dequeue();
  queue.value.enqueue(radical);
  localStorage.setItem(props.name, JSON.stringify(queue.value.toArray()));
  next();
};

/**
 * 重新开始
 */
const restart = () => {
  queue.value.clear();
  makeCards().forEach((item) => queue.value.enqueue(item));
  next();
};

/**
 * 丢弃卡牌
 */
const discard = () => {
  if (!current.value) return;
  next();
};

// 用于串击，状态为已经输入的字符串内容，比对输入的字符串和正确的编码
const input = ref("");
const processSerialInput = (newInput: string) => {
  if (current.value.key === newInput.toLowerCase()) {
    input.value = "";
    proceed();
  } else if (current.value.key.length === newInput.length) {
    hint.value = true;
    input.value = "";
  } else {
    input.value = newInput;
  }
};

// 用于并击，状态为已经输入的按键集合，比对输入的按键集合和正确的按键集合
const pressedKeys = ref(new Set());
const validKeysForCombo = new Set([..."qwertyuiopasdfghjkl;zxcvbnm,./"]);
const handleKeyDown = (event: KeyboardEvent) => {
  if (!validKeysForCombo.has(event.key.toLowerCase())) return;
  pressedKeys.value.add(event.key.toLowerCase());
};
const handleKeyUp = (event: KeyboardEvent) => {
  if (!validKeysForCombo.has(event.key.toLowerCase())) return;
  // 松开第一个按键时进行判断
  if (pressedKeys.value.size === 0) return;
  // 目标按键集合
  const targetKeys = new Set([...current.value.key.toLowerCase()]);
  if (isEqual(pressedKeys.value, targetKeys)) {
    proceed();
  } else {
    hint.value = true;
  }
  // 清空当前按键集合
  pressedKeys.value.clear();
};

onMounted(() => {
  const json = localStorage.getItem(props.name);
  if (json) {
    queue.value = MinPriorityQueue.fromArray<Radical>(
      JSON.parse(json),
      (x) => x.due
    );
  }
  next();
  sync();
});
</script>
<style>
.button-container {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.radical {
  font-size: 32px;
  text-align: center;
  padding: 16px;
}

.key {
  font-size: 16px;
  text-align: center;
}
</style>
<template>
  <n-config-provider :theme="theme">
    <n-space vertical :size="'large'">
      <div class="button-container">
        <n-button @click="restart">重新开始</n-button>
        <n-button @click="discard">丢弃卡片</n-button>
        <n-button @click="showModal = true">使用说明</n-button>
      </div>
      <n-modal v-model:show="showModal">
        <n-card style="max-width: 600px">
          <n-h1>使用说明</n-h1>
          <n-p>
            本程序利用
            <n-a target="_blank" href="https://supermemo.guru/wiki/SuperMemo"
              >SuperMemo</n-a
            >
            算法帮助用户快速且牢固地掌握输入方案的基本元素。
          </n-p>
          <n-p>
            训练时，程序会逐个显示需要练习的元素，顺序是随机的。在元素显示后，你要以最快的速度输入相应的编码。
          </n-p>
          <n-ul>
            <n-li>
              如果输入正确，则会自动显示下一张卡牌，且程序会根据你的响应时间来为你的记忆评级。程序会根据这个评级来安排该卡牌下次出现的时间，以便巩固你的记忆。
            </n-li>
            <n-li>如果输入不正确，程序会提示你正确的编码是什么。</n-li>
          </n-ul>
          <n-p>
            程序在运行时自动将当前进度记录到浏览器的本地存储当中，再次打开时会从本地存储中加载进度。该进度无法跨平台同步，请尽量使用同一浏览器来练习。
          </n-p>
        </n-card>
      </n-modal>
      <n-space vertical :align="'center'">
        <n-space :align="'center'">
          已学会<n-progress
            type="line"
            :percentage="(seen / length) * 100"
            style="width: 160px"
            :show-indicator="false"
          />
          {{ `${seen} / ${length}` }}
        </n-space>
        <n-space :align="'center'">
          已熟悉<n-progress
            type="line"
            :percentage="(familiar / length) * 100"
            style="width: 160px"
            :show-indicator="false"
          />
          {{ `${familiar} / ${length}` }}
        </n-space>
      </n-space>
      <n-card>
        <template #header>
          <div class="radical">
            <span>{{ current?.radical }}</span>
            <span v-if="hint">&nbsp;[{{ current?.key }}]</span>
          </div>
          <n-input
            v-if="!combo"
            :value="input"
            @input="processSerialInput"
            placeholder="请输入对应的编码"
            style="font-size: 16px"
          />
          <n-input
            v-else
            :value="Array.from(pressedKeys).join('')"
            @keydown="handleKeyDown"
            @keyup="handleKeyUp"
            placeholder="请输入对应的并击组合"
            style="font-size: 16px"
          />
        </template>
        <template #footer> </template>
      </n-card>
    </n-space>
  </n-config-provider>
</template>
