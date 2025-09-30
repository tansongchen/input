<script setup>
import Practice from '../components/Practice.vue'

const shengyundiao = Object.entries({
  // 声母
  zh: 'w',
  ch: 'y',
  sh: 'v',
  // 韵母：开口呼
  a: 'a',
  ai: 'ai',
  ao: 'au',
  an: 'ao',
  ang: 'ae',
  e: 'e',
  ei: 'ei',
  en: 'eo',
  eng: 'ee',
  er: 'i',
  o: 'o',
  ou: 'ou',
  ong: 'oe',
  // 韵母：合口呼
  u: 'u',
  ua: 'i',
  uai: 'ii',
  uan: 'io',
  uang: 'ie',
  uo: 'o',
  uei: 'ui',
  uen: 'uo',
  ueng: 'ue',
  // 韵母：齐齿呼
  i: 'i',
  ia: 'u',
  iao: 'uu',
  ian: 'uo',
  iang: 'ue',
  ie: 'e',
  in: 'io',
  ing: 'ie',
  io: 'o',
  iong: 'oe',
  iou: 'ou',
  // 韵母：撮口呼
  ü: 'a',
  üan: 'oo',
  üe: 'o',
  ün: 'ao',
  // 声调
  '阴平 1': 'i',
  '阳平 2': 'e',
  '上声 3': 'u',
  '去声 4': 'a',
  '轻声 5': 'o'
}).map(([front, back]) => ({ front, back }));

const lingshengmu = Object.entries({
  // 韵母：开口呼
  a: 'ra',
  ai: 'rai',
  ao: 'rau',
  an: 'rao',
  ang: 'rae',
  e: 're',
  ei: 'rei',
  en: 'reo',
  eng: 'ree',
  er: 'ri',
  o: 'ro',
  ou: 'rou',
  ong: 'roe',
  // 韵母：合口呼
  wu: 'su',
  wa: 'si',
  wai: 'sii',
  wan: 'sio',
  wang: 'sie',
  wo: 'so',
  wei: 'sui',
  wen: 'suo',
  weng: 'sue',
  // 韵母：齐齿呼
  yi: 'fi',
  ya: 'fu',
  yao: 'fuu',
  yan: 'fuo',
  yang: 'fue',
  ye: 'fe',
  yin: 'fio',
  ying: 'fie',
  yo: 'fo',
  yong: 'foe',
  you: 'fou',
  // 韵母：撮口呼
  yu: 'ka',
  yuan: 'koo',
  yue: 'ko',
  yun: 'kao',
}).map(([front, back]) => ({ front, back }));
</script>

# 拼写规则

本方案首先将汉语拼音的音节分解为声母、韵母和声调。例如「冰 bing1」可以分解为声母 b、韵母 ing 和声调 1（阴平）。有些音节在用汉语拼音拼写时作了一些变形，本方案中要首先把这些音节还原为原始的形式：

- 声母 j, q, x 后面接 u 时要还原为原始形式 ü，例如「娟 juan1」分解为 j + üan + 1；
- 韵母 iu, ui, un 还原为原始形式 iou, uei, uen，例如「秋 qiu1」分解为 q + iou + 1，「归 gui1」分解为 g + uei + 1，「魂 hun2」分解为 h + uen + 2；

下面我们来依次对声母、韵母和声调编码。

## 声母

声母的编码与汉语拼音中基本相同，区别仅仅在于 zh, ch, sh 这三个声母也压缩为了一个编码，对应关系如下：

| 声母 | 编码 |
| ---- | ---- |
| zh   | w    |
| ch   | y    |
| sh   | v    |

## 韵母

有些韵母用一个编码表示，有些韵母用两个编码表示。如下表：

<div class="columns">

| 韵母      | 编码 |
| ------------- | -------- |
| a, ü          | a        |
| o, io, uo, üe | o        |
| e, ie         | e        |
| i, ua, er     | i        |
| u, ia         | u        |
| ai            | ai       |
| ei            | ei       |
| uai           | ii       |
| uei           | ui       |
| ao            | au       |
| ou, iou       | ou       |
| iao           | uu       |

| 韵母   | 编码 |
| ---------- | -------- |
| an, ün     | ao       |
| üan        | oo       |
| en         | eo       |
| in, uan    | io       |
| uen, ian   | uo       |
| ang        | ae       |
| ong, iong  | oe       |
| eng, ng    | ee       |
| ing, uang  | ie       |
| ueng, iang | ue       |
| m          | ea       |
</div>

观察表格，很容易发现其规律：

- 第一码对应韵母的前半部分（称之为韵头）。例如 ua, uai, uan, uang 都以 ua 开头，所以它们的第一码都是 `i`；
- 如果有第二码，它对应韵母的后半部分（称之为韵尾）。例如 ang, eng, ing, ong, uang, ueng, iang 都以 -ng 结尾，所以它们的第二码都是 `e`；
- 韵母 ao, iao 的第二码规定为 `u`，和 ou, iou 放到同一组；
- 对于特殊的鼻音韵母 m 和 ng，规定它们的韵头为「零韵头 ∅」，第一码为 `e`；最终编码分别为 `ea` 和 `ee`；

根据这些规律可以把上表进一步精炼成下面的形式：

| 韵头              | 韵尾  | 编码 |
| ----------------- | ----- | ---- |
| a, ü              | -m    | a    |
| o, io, uo, üa, üe | -n    | o    |
| e, ie, ∅          | -ng   | e    |
| i, ua, er         | -i    | i    |
| u, ia, ue         | -u(o) | u    |

总之，您可以选择直接记忆韵母的双编码，也可以选择记忆韵头和韵尾的编码然后将它们拼合起来得到双编码。[附录中](#助记方法)也提供了一些助记方法帮助您更好地记忆。

## 声调

声调的编码如下：

| 声调   | 编码 |
| ------ | ---- |
| 去声 4 | a    |
| 轻声 5 | o    |
| 阳平 2 | e    |
| 阴平 1 | i    |
| 上声 3 | u    |

## 总结

综上所述，声母为一个编码、韵母为一或两个编码、声调为一个编码，总共用三或四个编码来表示，这也就是名字「冰雪四拼」的由来。下面给出几个音节的示例，请您对照上面的规则思考如何推导出对应的编码：

| 音节       | 分解             | 编码 |
| ---------- | ---------------- | ---- |
| 白 bai2    | b + a + i + 2    | baie |
| 狗 gou3    | g + o + u + 3    | gouu |
| 声 sheng1  | sh + e + ng + 1  | veei |
| 笔 bi3     | b + i + 3        | biu  |
| 调 diao4   | d + ia + u + 4   | duua |
| 庄 zhuang1 | zh + ua + ng + 1 | wiei |

并请您在下面的小游戏中练习声母、韵母和声调的键位。

<Practice :data="shengyundiao" name="bxsp-shengyundiao" />

## 零声母音节

汉语拼音中除了 b, p, m, f, d, t, n, l, g, k, h, j, q, x, zh, ch, sh, r, z, c, s 这 21 个声母之外，还有若干音节没有声母，这些音节称为零声母音节。在汉语拼音的拼写中，凡是以 a, e, o, w, y 这几个字母开头的音节都属于零声母音节，如「安 an1」、「弯 wan1」、「烟 yan1」、「冤 yuan1」等（y 和 w 按汉语拼音的规定并不是声母，而是韵母自成音节时变形的产物），它们只有韵母和声调的成分而没有声母。纯鼻音音节如「嗯 ng4」「呒 m2」等也算零声母音节。

本方案规定零声母音节在输入韵母之前需要输入一个引导键来代替声母，以保证音节拼写的规整。出于减少歧义的考虑，本方案将这些零声母音节分成四组，每组各用一个不同的引导键：

- a, ai, an, ang, ao, e, ei, en, eng, er, o, ou, m, n, ng：引导键为 `r`。例如要输入「安 an1」，需要先打 `r` 然后输入 an1 的编码，因此最终编码为 `raoi`；
- wa, wai, wan, wang, wei, wen, weng, wo, wu：这些音节是由韵母 ua, uai, uan, uang, uei, uen, ueng, uo, u 在自成音节时变形得来的；引导键为 `s`。例如要输入「弯 wan1」，需要先打 `s` 然后输入 uan1 的编码，因此最终编码为 `sioi`；
- ya, yan, yang, yao, ye, yi, yin, ying, yong, you：这些音节是由韵母 ia, ian, iang, iao, ie, i, in, ing, iong, iou 在自成音节时变形得来的；引导键为 `f`。例如要输入「烟 yan1」，需要先打 `f` 然后输入 ian1 的编码，因此最终编码为 `fuoi`；
- yu, yuan, yue, yun：这些音节是由韵母 ü, üan, üe, ün 在自成音节时变形得来的；引导键为 `k`。例如要输入「冤 yuan1」，需要先打 `k` 然后输入 üan1 的编码，因此最终编码为 `kooi`。

更多例子可见下表：

| 音节    | 分解                | 编码 |
| ------- | ------------------- | ---- |
| 而 er2  | `r` 键 + er + 2     | rie  |
| 我 wo3  | `s` 键 + uo + 3     | sou  |
| 有 you3 | `f` 键 + io + u + 3 | fouu |
| 月 yue4 | `k` 键 + üe + 4     | koa  |
| 嗯 ng4  | `r` 键 + ∅ + ng + 4 | reea |

零声母音节的拼写是本规则的主要难点，请您在下面的小游戏中练习零声母音节的拼写：

<Practice :data="lingshengmu" name="bxsp-lingshengmu" />

您也可以在附录中查看[所有零声母音节的拼写](#所有零声母音节的拼写)来进一步确认。

## 开始冰雪四拼的旅程！

经过刚才拼写的学习，您已经感受到四拼相对于全拼的优势：拼写的长度从最长 7 个字符（如「装 zhuang1」）缩短到 3 或者 4 个字符。值得高兴的是，您已经学完了本方案中最有挑战性的部分，后面的部分都比较简单。

为了尽快熟悉拼写规则，此时建议您立即使用冰雪四拼的「整句」模式开始打字。这还并不是冰雪四拼的最终形态，还仍然有巨大的效率提升空间，但是您在这个模式下可以打好基础，最快地熟悉拼写规则。

请在您的用户文件夹新建 `snow_sipin.custom.yaml`，并在其中写入以下内容：

```yaml
patch:
  # 开启整句模式
  switches/@4/reset: 0
```

重新部署后，您就可以用上面的拼写规则来输入任意长度的句子：

![](https://images.tansongchen.com/1737279173.png)

与其他拼音输入法稍有不同的一点是，本方案用空格上屏第一个候选项，但是使用 2, 3, 8, 9, 0 这些数字键来上屏第二个至第六个候选项，这主要是因为 1, 4, 5, 6, 7 这些数字键相比来说不那么容易击打。在使用冰雪四拼整句输入时，也请您一并熟悉这一特点。

## 附录

### 助记方法

- ia, ua, üa 这三个含 a 的韵头并排位于 `u`, `i`, `o` 键上；
- i 和其键上的 er 具有谐声关系，例如「你 ni3」～「尔 er3」、「腻 ni4」～「贰 er4」；
- e 和其键上的 ie 具有谐声关系，例如「谢 xie4」～「射 she4」
- o 和其键上的 io, uo, üe 具有谐声关系，例如「哦 o5」～「我 wo3」，「哟 yo5」～「约 yue1」、「略 lüe4」～「络 luo4」

### 所有零声母音节的拼写

这个表格主要是为了让大家理解本方案对零声母的处理方式，需要注重观察规律，请勿死记硬背。

| 音节    | 引导 | 韵头 | 韵尾 | 拼写 |
| ------- | ---- | ---- | ---- | ---- |
| 啊 a    | r    | a    | 无   | ra   |
| 哎 ai   | r    | a    | i    | rai  |
| 安 an   | r    | a    | n    | rao  |
| 昂 ang  | r    | a    | ng   | rae  |
| 凹 ao   | r    | a    | u    | rau  |
| 额 e    | r    | e    | 无   | re   |
| 诶 ei   | r    | e    | i    | rei  |
| 恩 en   | r    | e    | n    | reo  |
| 鞥 eng  | r    | e    | ng   | ree  |
| 而 er   | r    | er   | 无   | ri   |
| 哦 o    | r    | o    | 无   | ro   |
| 欧 ou   | r    | o    | u    | rou  |
| 呒 m    | r    | ∅    | m    | rea  |
| 嗯 ng   | r    | ∅    | ng   | ree  |
| 挖 wa   | s    | ua   | 无   | si   |
| 歪 wai  | s    | ua   | i    | sii  |
| 弯 wan  | s    | ua   | n    | sio  |
| 汪 wang | s    | ua   | ng   | sie  |
| 微 wei  | s    | ue   | i    | sui  |
| 温 wen  | s    | ue   | n    | suo  |
| 翁 weng | s    | ue   | ng   | sue  |
| 窝 wo   | s    | uo   | 无   | so   |
| 乌 wu   | s    | u    | 无   | su   |
| 压 ya   | f    | ia   | 无   | fu   |
| 腰 yao  | f    | ia   | u    | fuu  |
| 烟 yan  | f    | ia   | n    | fuo  |
| 央 yang | f    | ia   | ng   | fue  |
| 椰 ye   | f    | ie   | 无   | fe   |
| 哟 yo   | f    | io   | 无   | fo   |
| 优 you  | f    | io   | u    | fou  |
| 庸 yong | f    | io   | ng   | foe  |
| 一 yi   | f    | i    | 无   | fi   |
| 因 yin  | f    | i    | n    | fio  |
| 应 ying | f    | i    | ng   | fie  |
| 迂 yu   | k    | ü    | 无   | ka   |
| 晕 yun  | k    | ü    | n    | kao  |
| 渊 yuan | k    | üa   | n    | koo  |
| 约 yue  | k    | üe   | 无   | ko   |
