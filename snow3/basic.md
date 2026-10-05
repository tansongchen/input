<script setup>
import Window from '../components/Window.vue'

const 输入后置一 = "sanpin:bgxh";
const 输入后置二 = "sanpin:bgxhu";

const 动态码长词 = "史诗";
const 输入码长一 = "sanpin:ekek";
const 输入码长二 = "sanpin:ekekvu";
const 输入码长三 = "sanpin:ekekvuekek";

const 输入缓冲造词一 = "sanpin:{Control+j}bgxherf";
const 输入缓冲造词二 = "sanpin:{Control+j}bgxherf ";
const 输入缓冲造词三 = "sanpin:{Control+j}bgxherf  bxerF";

const 输入英数一 = "sanpin:{Control+j}wjugjatyxb  wgtx";
const 输入英数二 = "sanpin:{Control+j}dlvlsvikkamr  dlkm";

const 输入固定 = "sanpin:bmms{Control+semicolon}";
const 输入取消固定一 = "sanpin:ybck{Control+semicolon}";
const 输入取消固定二 = "sanpin:ybck";

const 加词编码 = "kfc";
const 加词 = "疯狂星期四";
const 输入加词一 = "sanpin:kfc";
const 输入加词二 = "sanpin:kfc{Control+apostrophe}fkxqS  {Control+apostrophe}kfc";

const 加词冲突编码 = "gc";
const 加词冲突 = "垃圾回收";
const 加词冲突候选 = "刚才";
const 输入加词冲突一 = "sanpin:gc";
const 输入加词冲突二 = "sanpin:gc{Control+apostrophe}ljhev {Control+apostrophe}gc";

const 输入后移一 = "sanpin:jmdz{Control+semicolon}{Down}{Control+semicolon}{Up}";
const 输入后移二 = "sanpin:jmdz{Control+semicolon}{Down}{Control+semicolon}{Up}{Control+bracketright}";
</script>

# 顶功编码

## 音节码固态词典

下面的描述中，「全码」表示按照规则来编码得到的全部输入码，而「简码」表示输入全码的前几个字母即可的部分字词。下标 ₁、₂、₃、₄ 分别表示词语的第一、二、三和最后一个字。

1. 单音节词：全码为「声₁韵₁调₁」，简码为前 1 码或前 2 码；
2. 双音节词：全码为「声₁韵₁声₂韵₂调₂调₁」，简码为前 4 码或前 5 码；
3. 三音节词：全码为「声₁声₂声₃调₃调₁调₂」，简码为前 3、4 或 5 码；
4. 四音节及更多音节词：全码为「声₁声₂声₃声₄调₄调₁」，简码为前 4 码或前 5 码。

本方案的编码具有一定的顶功特性。除单音节词在 1 码和 2 码时，以及三音节词在 3 码时是不可以顶的、需要空格上屏外，其余均可以由后续编码顶上屏幕。

### 首选后置

<!--@include: ../components/basic.md#postpone-->

## 音节码用户词典

### 动态调频与动态码长

<!--@include: ../components/basic.md#autolength-->

### 自动造词

<!--@include: ../components/basic.md#buffer-->

值得注意的是，由于软件实现上的限制，本方案只支持缓冲造词这一种方式，不支持选择造词、定位造词等等。未来这一限制有可能会改善。

### 英数混输造词

<!--@include: ../components/basic.md#alnum{,3}-->

- 阿拉伯数字与相应中文数字（零～九）相同
- 英文字母的音节码规定为
    - bpmfdtnlgkhjqxzcsrywe 加后缀 `ja`，例如 b 的音节码是 `bja`
    - viuoa 加前缀 `kk`，例如 a 的音节码是 `kka`
    - 所有大写字母固定在三码的首选，所有小写字母固定在三码的次选

<!--@include: ../components/basic.md#alnum{3,}-->

## 方案码固态词典

<!--@include: ../components/basic.md#schema-static-->

在本方案中，单音节词的一码、二码为固定内容。

此外，为提高输入速度，本方案在方案码固态词典中仿照冰雪键道加入了用两键或三键即可输入的多音节词。这些多音节词的规则为：

- 两键：「声₁调₂」，
- 三键：二字词「声₁调₂调₁」，多字词「声₁调₂调₃」

这些简码属于非常规简码，需要特殊记忆。这些编码均可以顶功。

## 方案码用户词典

<!--@include: ../components/basic.md#schema-userdb-->
