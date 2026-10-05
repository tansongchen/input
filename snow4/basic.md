<script setup>
import Window from '../components/Window.vue'

const 输入后置一 = "sipin:bxoui";
const 输入后置二 = "sipin:bxouie";

const 动态码长词 = "史诗";
const 输入码长一 = "sipin:vvi";
const 输入码长二 = "sipin:vviii";
const 输入码长三 = "sipin:vviiivvi";

const 输入选择造词一 = "sipin:bsiaie";
const 输入选择造词二 = "sipin:bsiaie8";

const 输入定位造词一 = "sipin:pffau";
const 输入定位造词二 = "sipin:pffau1uu{Down}";
const 输入定位造词三 = "sipin:pffau1uu2{Down}";
const 输入定位造词四 = "sipin:sfdvua";
const 输入定位造词五 = "sipin:sfdvua4eoui3ai";
const 输入定位造词六 = "sipin:tdjkL";
const 输入定位造词七 = "sipin:tdjkL5ui2i";

const 输入组句造词 = "sipin:jweoa mdjweoia";

const 输入缓冲造词一 = "sipin:{Control+j}bxouivrf";
const 输入缓冲造词二 = "sipin:{Control+j}bxouivrf ";
const 输入缓冲造词三 = "sipin:{Control+j}bxouivrf  bxvrF";

const 输入英数一 = "sipin:ggtxio1ue21oo  ggtx";
const 输入英数二 = "sipin:{Control+j}doi la sea mee  dlsm";

const 输入固定 = "sipin:bma{Control+semicolon}";
const 输入取消固定一 = "sipin:fc";
const 输入取消固定二 = "sipin:fc{Control+semicolon}";

const 加词编码 = "kfc";
const 加词 = "疯狂星期四";
const 输入加词一 = "sipin:kfc";
const 输入加词二 = "sipin:kfc{Control+apostrophe}fkxqS  {Control+apostrophe}kfc";

const 加词冲突编码 = "dna";
const 加词冲突 = "脱氧核糖核酸";
const 加词冲突候选 = "电脑";
const 输入加词冲突一 = "sipin:dna{Control+semicolon}";
const 输入加词冲突二 = "sipin:dna{Control+semicolon}{Control+apostrophe}tfhtHS {Control+apostrophe}dna";

const 输入后移一 = "sipin:kooe{Control+semicolon}{Down}{Control+semicolon}{Up}";
const 输入后移二 = "sipin:kooe{Control+semicolon}{Down}{Control+semicolon}{Up}{Control+bracketright}";
</script>

# 顶功编码

上一节中您通过学习冰雪四拼的拼写规则来缩短了带调拼音的拼写长度。不过，这样每个字仍然需要三四键，而且输入结束后需要空格上屏。更重要的是，整句拼音输入的形式不利于精准把控输入的内容，因为在整句中间出现音字转换错误的时候，通常很难修改；另一方面，输入平台一般只会机械地记录用户输入的每一句话，而用户不太可能再次输入完全相同的一句话，因此输入平台并没有很高效地学习用户的输入习惯。

综合考虑以上几点，会发现「每次输入需要空格上屏」这个特性实际上让整句的问题变得更严重了，因为用户为了尽可能减少空格会倾向于输入更长的一句话，但这不利于精准性和智能学习。有没有办法既能按比较短的单位来输入，又不需要空格上屏呢？有的！这就是顶功的编码方式。

对于冰雪四拼来说，这意味着一个词的编码不再是每个音节的编码连起来打，而是应用了一套新的构词规则。初学者对于这套规则可能会感觉到颠三倒四，但是熟悉之后就会感觉到无比自然。

## 音节码固态词典

### 构词规则

本方案使用统一的规则来编码所有不同长度的词：

> 先打各个音节的声母编码；如果首选未命中，追加末音节的编码直至三码；如果首选仍未命中，追加首音节的编码直至三码。

也就是说，虽然冰雪四拼每个音节的拼写可能是三或四码，但是构词的时候词的首音节和末音节最多用前三码，而其他音节最多用第一码。各个音节的声母是首先必须要打的，后面追加的编码称为「补码」，可能有 0 ~ 4 个。到底需要打多少个补码，取决于词的频率，常用的词打得少，不常用的词就打得多。以下针对不同长度的词分别举几个例子：

1. 单音节词：「有」的编码为 `f`，「又」的编码为 `fo`，「由」的编码为 `fou`；
2. 双音节词：「你好」的编码为 `nh`，「希望」的编码为 `xsi`，「手机」的编码为 `vjii`，「冰雪」的编码为 `bxoui`，「元气」的编码为 `kqiaoo`；
3. 三音节词：「为什么」的编码为 `svm`，「变压器」的编码为 `bfqi`，「最低点」的编码为 `zdduo`；
4. 四音节词：「感同身受」的编码为 `gtvv`，「将计就计」的编码为 `jjjji`，「附庸风雅」的编码为 `ffffuu`；
5. 以此类推，$n$ 音节词的编码可能为 $n$ 码到 $n+4$ 码不等。

对于大于等于五个音节的词语，进一步规定第五个声母以及之后的所有声母需要用大写字母来输入。例如「科学发展观」的编码为 `kxfwG`，「哀莫大于心死」的编码为 `rmdkXS`，「中华人民共和国」的编码为 `whrmGHG`。另外，由于动态调频的存在，实际输入的编码可能与上述介绍有细微的差异。

为什么要这样设置构词规则？答案是——为了顶功！

观察上面的规则，容易发现规律如下：每个词的编码都是先有几个 `bpmfdtnlgkhjqxzcsrwyv` 这样的辅音字母，然后可能有几个 `aeiou` 这样的元音字母（当然也可能没有元音字母）。这意味着，如果用户输入完元音字母之后再输入辅音字母，就说明一定已经开始输入下一个词了，此时输入平台做出判断将前一个词顶上屏幕。在分词输入的前提下，这无疑节省了大量的空格键。

注意，对于「有 `f`」、「你好 `nh`」、「为什么 `svm`」这样的只包含辅音字母的编码来说，因为不知道后面还有没有更多的辅音字母，所以仍然需要使用空格上屏。但是，对于四音节词以及更长的词来说，后面的辅音字母是用大写输入，因此即使是「感同身受 `gtvv`」这样的也可以在输入下一个词的首码的时候自动被顶上屏。

上面提到，在输入完声母之后，后面的补码可能有 0 ~ 4 个。在输入的过程中，建议的打法是：观察候选中的第一个词，然后不断追加补码使得想要的词出现在首选；如果输完四个之后仍然没有出现在首选，则继续用数字键和翻页键选择候选（这种情况极少）。

### 首选后置

<!--@include: ../components/basic.md#postpone-->

## 音节码用户词典

### 动态调频与动态码长

<!--@include: ../components/basic.md#autolength-->

### 自动造词

#### 选择造词

<!--@include: ../components/basic.md#encode-select-->

#### 定位造词

<!--@include: ../components/basic.md#encode-locate-->

#### 组句造词

<!--@include: ../components/basic.md#encode-sentence-->

#### 缓冲造词

<!--@include: ../components/basic.md#buffer-->

### 英数混输造词

<!--@include: ../components/basic.md#alnum{,3}-->

- 阿拉伯数字与相应中文数字（零～九）相同，中文数字固定在三码的首选，阿拉伯数字固定在三码的次选；
- 英文字母的音节码规定为
    - 辅音字母加后缀 `oo`，例如 b 的音节码是 `boo`
    - 元音字母加前缀 `se`，例如 a 的音节码是 `sea`
    - 除了 j, q, x, k 这些字母外，所有大写字母固定在三码的首选，所有小写字母固定在三码的次选
    - 对于 j, q, x, k 由于首选已经被 `*oo` 的高频字占据，因此所有大写字母固定在三码的次选，所有小写字母固定在三码的三选

<!--@include: ../components/basic.md#alnum{3,}-->

## 方案码固态词典

<!--@include: ../components/basic.md#schema-static-->

相比于声笔简整和声笔拼音，本方案设计的固定候选词更多，包括了 636 个单音节词和 510 个双音节词，而且进行了更加细致的优化。这使得在一般的连续性输入文本中固定候选词的总频率已经达到了 70% 以上，所以掌握固定候选词可以快速提高输入方案的熟练度。这些固定候选词的规律是：

- 单音节词的一码（21 个）、二码（105 个）和三码（510 个）全部固定；
- 双音节词的二码（441 个）全部固定，而三码和四码选取了一部分（69 个）固定；

为了减小固定候选词的记忆难度，本方案选取固定候选词的时候采取了语义优先的策略，也就是语义相关的词往往具有相同或相关的固定码长，记住一个往往就记住了一大片。例如，

```
...
# 事物代词
wg	这个
ng	那个
nge	哪个
wr	这儿
nr	那儿
nri	哪儿
wl	这里
nl	那里
nli	哪里
...
```

在 `snow_sipin.fixed.txt` 中有很多像这样的语义集中的「区块」，看过一次之后就能留下比较深刻的印象。

另外，「的」和「了」两个字因为频率非常高，所以分别采用 `;` 和 `/` 键输入，不占用常规固定候选词的位置。如果不喜欢这个设定，可以在固定候选词文件中自定义。作为替代，分号用 `|` 输入（即 Shift + `\`），顿号用 `\` 输入。

### 可选的无理音节

在设置固定候选词的时候，注意到「三」和「四」的声母编码都是 `s`，无法在「三个」、「四个」等词中保持同样的码长，而且因为「五」的声母「零合」也在 `s` 上，让这个问题更加严重了。另外，「日」和「二」的前三码都是 `ria`，也破坏了一些词的整齐性。

为了解决这个问题，对「三」、「五」、「日」这三个字所在的音节增加了无理音节码：

- `san1` 这个音节也可以用 `heu` 打出来，同时也是「三」的固定码
- `wu3` 这个音节也可以用 `gue` 打出来，同时也是「五」的固定码
- `ri4` 这个音节也可以用 `rii` 打出来，同时也是「日」的固定码

记忆的时候，可以把它们当成是一周中的三天，用「周三 `wheu`」「周五 `wgue`」「周日 `wrii`」这三个固定候选词来辅助记忆。另外，虽然这些音节的其他字也能用无理码打出来，但是并不推荐这样做，因为会干扰常规音节码的键位；如果反过来当成是改变了这三个字的读音，会更容易适应。

如果您记住了这些无理音节，并想强制自己使用，可以在补丁文件（`snow_sipin.custom.yaml`）里写入：

```yaml
patch:
  speller/force_special: true
```

这样的好处是不仅固定词不会冲突，其他动态调频的常规词也不会再冲突了。例如，您正在输入「二零二四」和「二零二五」两个词，若仅仅启用无理音节码而不强制使用，则虽然 `rlrg` 可以唯一地得到「二零二五」这个词，但是 `rlrs` 仍然会同时出现「二零二四」和「二零二五」的候选。而若强制使用无理音节码，则可以完全分离这两个词：

<Window input="sipin:rlrs{Down}{Down}" />
<Window input="sipin:rlrg" />

## 方案码用户词典

<!--@include: ../components/basic.md#schema-userdb-->
