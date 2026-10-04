<script setup>
import Window from '../components/Window.vue'

const 输入注解一 = "qingyun:dvme";
const 输入注解二 = "qingyun:dvme{Control+u}";

const 输入定字一 = "qingyun:xxrr";
const 输入定字二 = "qingyun:cweI{Down}{Down}{Down}{Down}{Down}";

const 拼音反查键 = "`";
const 笔画反查键 = "`";
const 输入反查一 = "qingyun:`zhe";
const 输入反查二 = "qingyun:`eiuoa";

const 重复键 = "`";
const 输入重复 = "qingyun:cfu? `";
</script>

# 高级功能

## Unicode 注解

<!--@include: ../components/advanced.md#unicode-->

## 以词定字

<!--@include: ../components/advanced.md#word-to-char-->

## 反查

由于冰雪清韵同时支持形码和音码输入，所以可以在不需要引导键的情况下直接用拼音输入单个汉字并显示相应的形码。

<Window input="qingyun:yi" />

除此之外，还提供拼音（即全拼）反查和笔画反查：

<!--@include: ../components/advanced.md#reverse-lookup-->

## 重复上屏

<!--@include: ../components/advanced.md#repeat-->
