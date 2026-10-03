<script setup>
import Window from '../components/Window.vue'
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

## 音节码用户词典

### 动态调频与动态码长

<!--@include: ../components/basic.md#autolength-->

### 自动造词

<!--@include: ../components/basic.md#buffer-->

为了部分地解决这个问题，对于「一字加一字得到二字词」这种比较常见的情况提供了另一种造词方式，即定位补码造词。例如，想打「星猫」一词时已经按词的编码输入了 `xgmz`，发现候选中没有「星猫」这个词；此时不必清空，而是可以补充「星」的形码 `oi` 将其提到首选：
<Window input="jiandao:xgmz"/>
<Window input="jiandao:xgmzoi"/>
空格确认后，再补充「猫」的形码 `ua`：
<Window input="jiandao:xgmzoi ua"/>
再次空格后，「星猫」上屏，同时也造好了词「星猫」。
<Window input="jiandao:xgmzoi ua  xgmz"/>

这种造词方式的优点是可以复用已有的编码。

### 英数混输造词

<!--@include: ../components/basic.md#alnum-->

- 阿拉伯数字与相应中文数字（零～九）相同
- 英文字母的音节码规定为
    - `bpmfdtnlgkhjqxzcsrywe` 加后缀 `e`，例如 b 的音节码是 `be`
    - `viuoa` 的音节码是 `x` 加上对应的韵母：`i = xk`, `u = xj`, `o = xl`, `a = xs`, 而 `v` 因为已经被占用规定为 `xh`
    - 所有大写字母固定在二码的次选，所有小写字母固定在二​码的三选

<!--@include: ../components/basic.md#alnum-2-->

## 方案码固态词典

考虑到保持原有的用户习惯，对于一至三码的一字词和特殊简码（声声简词、630 简词）不使用动态调频策略。这些固定的编码定义在 `snow_jiandao.fixed.txt` 中，如果想要调整请直接修改这个文件。

## 方案码用户词典

<!--@include: ../components/basic.md#schema-userdb-->
