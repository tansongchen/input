<script setup lang="ts">
import {
  NButton,
  NUpload,
  NUploadDragger,
  NText,
  NSpace,
  NIcon,
  NConfigProvider,
  NResult,
} from "naive-ui";

import { FileArchive } from "@vicons/fa";
import { UploadCustomRequestOptions } from "naive-ui/es/upload";
import { onMounted, ref } from "vue";
import { sync, theme } from "../src/utils";
import { addPronunciation } from "../src/pronounce";

const content = ref<string>("");
const filename = ref<string>("");

function processFile({ file }: UploadCustomRequestOptions) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const result = reader.result;
    if (typeof result === "string") {
      content.value = addPronunciation(result);
    }
  });
  filename.value = file.name;
  reader.readAsText(file.file as File);
}

function downloadFile() {
  const blob = new Blob([content.value], { type: "text/plain" });
  const a = document.createElement("a");
  a.download = filename.value;
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.click();
  window.URL.revokeObjectURL(url); // 避免内存泄漏
}

onMounted(sync);
</script>

<template>
  <n-config-provider :theme="theme">
    <n-space vertical :align="'center'">
      <n-upload directory-dnd :custom-request="processFile" :accept="'.txt'">
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <file-archive />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
        </n-upload-dragger>
      </n-upload>
      <n-result v-if="content.length > 0" status="success" :description="`转换成功，共 ${content.split('\n').length
    } 条`">
        <template #footer>
          <n-button :on-click="downloadFile">下载</n-button>
        </template>
      </n-result>
    </n-space>
  </n-config-provider>
</template>
