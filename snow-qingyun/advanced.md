<script setup>
import Window from '../components/Window.vue'

const 输入注解一 = "qingyun:dvme";
const 输入注解二 = "qingyun:dvme{Control+u}";

const 输入定字一 = "sipin:xxrr";
const 输入定字二 = "sipin:csuiai{Down}{Down}";

const 输入反查一 = "sipin:azhe";
const 输入反查二 = "sipin:ueiuoa";

const 输入重复 = "sipin:yfu i";

const 输入符号 = "sipin:ia";

const 输入脚本一 = "sipin:o123";
const 输入脚本二 = "sipin:o1234*5678";
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

## 符号

<!--@include: ../components/advanced.md#symbols-->

## Lua 脚本

<!--@include: ../components/advanced.md#lua-->
