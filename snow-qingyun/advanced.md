<script setup>
import Window from '../components/Window.vue'
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
