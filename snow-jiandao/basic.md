<script setup>
import Window from '../components/Window.vue'

const 输入后置一 = "jiandao:bgxh";
const 输入后置二 = "jiandao:bgxho";

const 动态码长词 = "史诗";
const 输入码长一 = "jiandao:ekek";
const 输入码长二 = "jiandao:ekekio";
const 输入码长三 = "jiandao:ekekioekek";

const 输入缓冲造词一 = "jiandao:jmdzio2{Control+j}bgxhjmdz";
const 输入缓冲造词二 = "jiandao:jmdzio2{Control+j}bgxhjmdz ";
const 输入缓冲造词三 = "jiandao:jmdzio2{Control+j}bgxhjmdz  bxjd";

const 输入英数一 = "jiandao:{Control+j}wjv2ge2tyxb  wgtx";
const 输入英数二 = "jiandao:{Control+j}dlou lso xs2mr  dlxm";

const 输入固定 = "jiandao:bmms{Control+semicolon}";
const 输入取消固定一 = "jiandao:ybck{Control+semicolon}";
const 输入取消固定二 = "jiandao:ybck";

const 加词编码 = "kfc";
const 加词 = "疯狂星期四";
const 输入加词一 = "jiandao:kfc";
const 输入加词二 = "jiandao:kfc{Control+apostrophe}fkxqS  {Control+apostrophe}kfc";

const 加词冲突编码 = "gc";
const 加词冲突 = "垃圾回收";
const 加词冲突候选 = "刚才";
const 输入加词冲突一 = "jiandao:gc";
const 输入加词冲突二 = "jiandao:gc{Control+apostrophe}ljhev {Control+apostrophe}gc";
const 输入后移一 = "jiandao:jmdz{Control+semicolon}{Down}{Control+semicolon}{Up}";
const 输入后移二 = "jiandao:jmdz{Control+semicolon}{Down}{Control+semicolon}{Up}{Control+bracketright}";
</script>

# 顶功编码

## 音节码固态词典

### 构词规则

冰雪键道的五字及以上词构词规则与星空键道有所不同。在星空键道中，五字及以上词的打法为第一、二、三和末字的声母加上前两个字的笔画；但在冰雪拼音体系内，由于无法采用这样的逻辑来查询词典，因此改为用前四个字的声母加上前两个字的笔画。例如，「三下五除二」的编码为 `sxwjvv`：
<Window input="jiandao:sxwjvv"/>
在有些情况下，使用这种方式输入可能会导致重码较为显著。例如，「科学发展观」的编码为 `kxfquo`，与「科学发展」相同；「中华人民共和国」的编码为 `fhrmii`，与「中华人民」相同：
<Window input="jiandao:kxfq"/>
<Window input="jiandao:fhrm"/>
因此，本方案还提供了另一种方法来重码更低地输入多字词，即先输入前四个字的声母，然后用大写字母继续输入其余的声母，这样既不影响顶功，又增加了多字词的信息量。例如，输入 `kxfqG`，「科学发展观」就出现在首选：
<Window input="jiandao:kxfqG"/>

由于冰雪键道是动态调频的，因此用户在实际使用中可以结合上述两种方法：对于没打过或重码较多的词，宜使用大写字母补全后续的声母以尽快筛选；对于已经打过或重码较少的词，宜用常规方法通过补充笔画将其提升到首选，这样可以避免输入大写字母。

### 首选后置

<!--@include: ../components/basic.md#postpone-->

## 音节码用户词典

### 动态调频与动态码长

<!--@include: ../components/basic.md#autolength-->

### 自动造词

#### 缓冲造词

<!--@include: ../components/basic.md#buffer-->

注意，在拆分输入的过程中不能使用 630 简码（因为这些是特殊的简码，系统中没有这些简码对应的完整拼音，会导致造词失败）。

#### 选择造词

对于「一字加一字得到二字词」这种比较常见的情况提供了另一种造词方式，即选择造词。例如，想打「星猫」一词时已经按词的编码输入了 `xgmz`，发现候选中没有「星猫」这个词；此时不必清空，而是可以补充「星」的形码 `oi` 将其提到首选：
<Window input="jiandao:xgmz"/>
<Window input="jiandao:xgmzoi"/>
空格确认后，再补充「猫」的形码 `ua`：
<Window input="jiandao:xgmzoi ua"/>
再次空格后，「星猫」上屏，同时也造好了词「星猫」。
<Window input="jiandao:xgmzoi ua  xgmz"/>

### 英数混输造词

<!--@include: ../components/basic.md#alnum{,3}-->

- 阿拉伯数字与相应中文数字（零～九）相同
- 英文字母的音节码规定为
    - `bpmfdtnlgkhjqxzcsrywe` 加后缀 `e`，例如 b 的音节码是 `be`
    - `viuoa` 的音节码是 `x` 加上对应的韵母：`i = xk`, `u = xj`, `o = xl`, `a = xs`, 而 `v` 因为已经被占用规定为 `xh`
    - 所有大写字母固定在二码的次选，所有小写字母固定在二​码的三选

<!--@include: ../components/basic.md#alnum{3,}-->

## 方案码固态词典

<!--@include: ../components/basic.md#schema-static-->

本方案的固定词具体包括：

- 一至三码的一字词
- 声声简词
- 630 简词

如果您是从传统的键道方案迁移过来，这些固定词与传统键道方案中对应编码的候选是一致的，方便您继承使用习惯。

## 方案码用户词典

<!--@include: ../components/basic.md#schema-userdb-->
