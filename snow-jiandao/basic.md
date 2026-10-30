<script setup>
import Window from '../components/Window.vue'

const 输入后置一 = "jiandao:bgxh";
const 输入后置二 = "jiandao:bgxho";

const 动态码长词 = "史诗";
const 输入码长一 = "jiandao:ekek";
const 输入码长二 = "jiandao:ekekio";
const 输入码长三 = "jiandao:ekekioekek";

const 输入缓冲造词一 = "jiandao:{Control+j}bgxherf";
const 输入缓冲造词二 = "jiandao:{Control+j}bgxherf ";
const 输入缓冲造词三 = "jiandao:{Control+j}bgxherf  bxero";

const 输入英数一 = "jiandao:{Control+j}wjv2ge2tyxb  wgtx";
const 输入英数二 = "jiandao:{Control+j}dlou lso xs2mr  dlxm";

const 输入固定 = "jiandao:bmms{Control+semicolon}";
const 输入取消固定一 = "jiandao:ybck{Control+semicolon}";
const 输入取消固定二 = "jiandao:ybck";

const 加词编码 = "kfc";
const 加词 = "疯狂星期四V我50";
const 输入加词一 = "jiandao:kfc";
const 输入加词二 = "jiandao:kfc{Control+apostrophe}fkxqS Vw 50{Control+apostrophe}kfc";

const 加词冲突编码 = "gc";
const 加词冲突 = "垃圾回收";
const 加词冲突候选 = "刚才";
const 输入加词冲突一 = "jiandao:gc";
const 输入加词冲突二 = "jiandao:gc{Control+apostrophe}ljhev {Control+apostrophe}gc";
const 输入后移一 = "jiandao:jmdz{Control+semicolon}{Down}{Control+semicolon}{Up}";
const 输入后移二 = "jiandao:jmdz{Control+semicolon}{Down}{Control+semicolon}{Up}{Control+bracketright}";
</script>

# 顶功编码

## 选词与编辑

本方案每页显示六个候选，使用普通数字键选重：

| 操作 | 按键 |
| --- | --- |
| 确认首选 | 空格或 `1` |
| 选择第 2～6 项 | `2`～`6` |
| 下一页、上一页 | `Tab`、翻页后的 `Shift+Tab` |
| 删除编码、取消当前输入 | `BackSpace`、`Escape` |

本方案没有数字定位键，可以通过下文的选择造词或缓冲造词拆分输入。`[`、`]` 用于以词定字，拆分提示、其他编辑和模式切换见[高级功能](./advanced)。

## 音节码固态词典

### 构词规则

冰雪键道的三字及以上词先输入各字声母；四字以上词先输入前四个声母。需要筛选时，可以依次补充每个字的形码首码，也可以只补前缀。例如，「三下五除二」可输入 `sxwjvv`，继续补全为 `sxwjvvvav`：

<Window input="jiandao:sxwjvv"/>
<Window input="jiandao:sxwjvvvav"/>

「科学发展」和「科学发展观」都可用 `kxfquo` 查询；补上第五字的形码得到 `kxfquoaaa`，就能排除四字词：

<Window input="jiandao:kxfq"/>
<Window input="jiandao:kxfquoaaa"/>

「中华人民」和「中华人民共和国」同样可逐字补形码，后者的完整形码为 `iiiavui`：

<Window input="jiandao:fhrm"/>
<Window input="jiandao:fhrmiiiavui"/>

已有四个小写字母后，也可以用大写字母继续输入后续声母。例如，输入 `kxfqG`，「科学发展观」就出现在首选；输入 `fhrmGHG` 可查询「中华人民共和国」。这些大写字母会转成小写声母参与编码，后续仍可补形码。

<Window input="jiandao:kxfqG"/>

### 混合声韵拼写

输入前三个字的声母时，可在每个声母后用大写字母补该字的韵母，缩小三字及以上词的候选范围。例如，「输入法」可输入 `eJrf`、`erJf`、`erfS`，也可以同时补成 `eJrJfS`；声韵飞键仍可使用，如「自行车」可输入 `zKxGjE`。

<Window input="jiandao:eJrJfS"/>
<Window input="jiandao:zKxGjE"/>

大写韵母不计入四个小写字母的分界。因此，`kExHfSq` 查询「科学发展」，再输入大写 `G` 会追加第五字的声母，查询「科学发展观」；此时 `G` 不再是第四字的韵母。

<Window input="jiandao:kExHfSqG"/>

补韵母后仍可补形码，例如 `eJrJfSv` 查询「输入法」。退格会直接删除刚补的韵母；两字词继续使用原来的双拼编码，如「冰雪」输入 `bgxh`。没有编码时，大写字母仍用于输入西文。上述大写拼写规则用于顶功模式，整句模式继续使用原有拼写。

由于冰雪键道会动态调频，实际输入时可根据候选重码情况选择补韵母、补形码或补后续声母。

### 首选后置

<!--@include: ../components/basic.md#postpone-->

## 音节码用户词典

### 动态调频与动态码长

<!--@include: ../components/basic.md#autolength-->

### 自动造词

#### 缓冲造词

<!--@include: ../components/basic.md#buffer-->

也可以在没有编码时输入 `o`，选择“📝 开启缓冲”进入同一模式。选择此命令不会上屏文字；取消候选不会开启缓冲，再次选择只会保持开启。

<Window input="jiandao:o" />

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
    - bpmfdtnlgkhjqxzcsrywe 加后缀 `e`，例如 b 的音节码是 `be`
    - viuoa 的音节码是 `x` 加上对应的韵母：i → `xk`, u → `xj`, o → `xl`, a → `xs`, 而 `v` 因为已经被占用规定为 `xh`
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

## 词库设置

以下设置写入本方案的 `snow_jiandao.custom.yaml`，修改后重新部署；多个设置合并到同一个 `patch` 下。补丁文件的位置见[使用补丁文件](/#使用补丁文件)。

### 词库与读音

<!--@include: ../components/configuration.md#word-sources-->

### 批量加入词汇

<!--@include: ../components/configuration.md#word-import-->

<!--@include: ../components/configuration.md#import-jianpin-->

### 裁剪词库

<!--@include: ../components/configuration.md#packs-jianpin-->

### 关闭调频与自动造词

<!--@include: ../components/configuration.md#user-dict-jianpin-->

### 每页候选数

<!--@include: ../components/configuration.md#candidate-menu-->
