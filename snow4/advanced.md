<script setup>
import Window from '../components/Window.vue'

const 输入定字一 = "sipin:xxrr";
const 输入定字二 = "sipin:csuiai{Down}{Down}";

const 输入反查一 = "sipin:azhe";
const 输入反查二 = "sipin:ueiuoa";

const 输入重复 = "sipin:yfu i";

const 输入符号 = "sipin:ia";

const 输入脚本一 = "sipin:o123";
const 输入脚本二 = "sipin:o1234*5678";

const 输入辅助码一 = "sipin:kooeei{Down}{Down}{Down}";
const 输入辅助码二 = "sipin:fiaooe{Down}{Down}{Down}{Down}{Down}";
const 输入辅助码三 = "sipin:raueee";
const 输入辅助码四 = "sipin:raue1v{Down}";
const 输入辅助码五 = "sipin:wia1m";
const 输入辅助码六 = "sipin:fa1s";
</script>

# 高级功能

## 以词定字

<!--@include: ../components/advanced.md#word-to-char-->

## 反查

<!--@include: ../components/advanced.md#reverse-lookup-->

## 重复上屏

<!--@include: ../components/advanced.md#repeat-->

## 符号

<!--@include: ../components/advanced.md#symbols-->

## Lua 脚本

<!--@include: ../components/advanced.md#lua-->

## 略码

<!--@include: ../components/advanced.md#abbreviation-->

## 辅助码

### 笔画辅助码

<!--@include: ../components/advanced.md#auxiliary-bihua -->

因为本方案中无韵尾音节编为 3 码、而有韵尾音节编为 4 码，所以无韵尾音节在用笔画辅助码的时候要先打一个 `o` 补全 4 码，然后再输入笔画，防止和有韵尾音节产生冲突。例如，输入生僻字「翊」，在音节码 `fia` 输入完成之后先补 `o` 再加两个笔画 `oe`，即出现在首页。

<Window :input="输入辅助码二" />

### 部首辅助码

<!--@include: ../components/advanced.md#auxiliary-bushou -->

另外，由于这种辅助码使用了 1 作为引导键，所以无韵尾音节不需要补 o 也可以使用辅助码，例如

<Window :input="输入辅助码五" />

在不清楚声调的情况下，也可以打完 2 码就加辅助码：

<Window :input="输入辅助码六" />

部首辅助码也能够顶功，在输入辅助码的过程中若所要的字为首选，继续输入下一个字的编码即可顶上屏。

## 附录：非成字部首的读音

<!--@include: ../components/advanced.md#radical-reading-->
