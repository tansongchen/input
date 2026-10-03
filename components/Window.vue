<script setup lang="ts">
// biome-ignore lint/style/useVueMultiWordComponentNames: xxx
import { range } from "lodash-es";
import simulation from "../src/simulation.json";
import type { 候选框状态 } from "../src/utils";

const { input } = defineProps<{ input: string }>();
const defaultStatus: 候选框状态 = {
	commit: "",
	buffer: "",
	prompt: "",
	unused: "",
	candidates: [],
	selectedIndex: 0
};
const status = (simulation as Record<string, 候选框状态>)[input] ?? defaultStatus;
// biome-ignore lint/correctness/noUnusedVariables: vue
const { commit, buffer, prompt, unused, candidates, selectedIndex } = status;
const labelsAlt = ["_", "2", "3", "8", "9", "0"];
// biome-ignore lint/correctness/noUnusedVariables: vue
const labels = /sipin|sanpin/.test(input)
	? labelsAlt
	: range(6).map((x) => `${x + 1}`);
</script>

<template>
  <div class="candidate-view">
    <div class="preedit">
      <span class="buffer">{{ buffer }}</span>
      <span class="prompt">{{ prompt }}</span>
      <span class="cursor"></span>
      <span class="unused">{{ unused }}</span>
    </div>
    <ol v-if="candidates.length" class="candidates">
      <li
        v-for="(candidate, index) in candidates"
        :key="index"
        :class="{ selected: index === selectedIndex }"
      >
        <span class="label">{{ labels[index] }}.</span>
        <span class="text">{{ candidate.text }}</span>
        <span v-if="candidate.comment.trim()" class="comment">
          {{ candidate.comment.trim() }}
        </span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.candidate-view {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  max-width: 100%;
  margin-block: 4px;
  padding: 4px;
  font-size: 1rem;
  line-height: 1.5;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-2);
}

.preedit {
  display: flex;
  align-items: center;
  padding-inline: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
}

.prompt {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.cursor {
  display: inline-block;
  width: 1px;
  height: 1.1em;
  margin-inline: 1px;
  background-color: var(--vp-c-text-1);
}

.unused {
  color: var(--vp-c-text-3);
}

.candidates {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin: 0;
  padding: 0 !important;
  list-style: none;
}

.candidates li {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin: 0;
  padding: 0 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.candidates li.selected {
  color: var(--vp-c-neutral-inverse);
  background-color: var(--vp-c-brand-1);
}

.label {
  font-size: 0.8em;
  color: var(--vp-c-text-3);
}

.comment {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}

.selected .label,
.selected .comment {
  color: inherit;
  opacity: 0.8;
}
</style>
