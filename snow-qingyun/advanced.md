<script setup>
import Window from '../components/Window.vue'
</script>

# 高级功能

## Unicode 注解

在输入大字集中的汉字时，我们常常会遇到两个不同的汉字有同样的字形的情况，在候选框中可能难以分辨。例如，`dvme` 给出了两个一模一样的「行」字：
<Window input="qingyun:dvme" />
此时可以按 `Control+u` 打开 Unicode 注解，候选框中将显示汉字的 Unicode 编码和所属的 Unicode 区块，根据这些信息就可以找出所需的汉字。在这个例子中，两个「行」分别属于「中日韩统一表意文字基本区」（用 `CJK` 表示）和「康熙部首」（用 `部首` 表示）。
<Window input="qingyun:dvme{Control+u}" />

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
