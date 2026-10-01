## 音节码用户词典

### 缓冲造词

<!-- #region buffer -->

冰雪键道造词的方法为：在没有输入编码的情况下，按 `v` 进入造词模式，然后将想造词的内容拆分成较小的单位来完成输入，此时输入的内容会积累在缓冲区中而不上屏。输入完想造词的内容后，再按一次空格，此时缓冲区中的内容上屏，同时也完成了造词。

下面以造「冰雪键道」这个词为例：首先按 `v`，此时会提示「造词」（取决于前端的实现，也可能不会有提示），然后输入 `bgxhjmdz`（此时的输入逻辑与平时相同，顶功的功能也有效，因此 `j` 会把 `bgxh` 对应的首选「冰雪」顶上屏），如下图所示：
![rime](https://images.tansongchen.com/1741309930.png)
然后空格确认「键道」，这样想要造词的内容就全部进入了缓冲区：
![rime](https://images.tansongchen.com/1741310062.png)
再按一次空格，「冰雪键道」上屏，同时也完成了造词。
![rime](https://images.tansongchen.com/1741310151.png)

注意，在拆分输入的过程中不能使用 630 简码（因为这些是特殊的简码，系统中没有这些简码对应的完整拼音，会导致造词失败）。另外，如果是在输入过程中才想起来造词，此时不能按 `v` 进入造词模式（因为它通常代表追加形码），而是需要按 `Control+j` 进入造词模式。

这种造词方式非常灵活，可以以任意方式拆分任意次来输入，例如二字加二字得到四字词、一字加二字得到三字词、二字加三字得到五字词等等。但是，其缺点就是必须提前想好要造词，按照拆分的方式来输入，如果已经不小心按照词的编码来打了，就需要先清空再完成造词。
<!-- #endregion buffer -->

### 英数混输造词

<!-- #region alnum -->

在科技与流行文化中，经常出现混有英文、数字的词语的情况。为了让这些词也能够自动造词，本方案给 10 个阿拉伯数字、26 个大写英文字母、26 个小写英文字母也指定了相应的音节码。
<!-- #endregion alnum -->

### 英数混输造词2

<!-- #region alnum-2 -->

使用这些候选，就可以轻易造出如「5G通信」「哆啦A梦」这样的词：
<!-- #endregion alnum-2 -->

## 方案码用户词典

<!-- #region schema-userdb -->

用户可以利用方案码用户词典来对方案码固态词典中的条目进一步自定义。与音节码用户词典不同的是，音节码用户词典存储在 `snow_pinyin.userdb` 文件夹中、并同步到 `snow_pinyin.userdb.txt` 中；方案码用户词典存储在 `snow_{{ $frontmatter.name }}.userdb` 文件夹中、并同步到 `snow_{{ $frontmatter.name }}.userdb.txt` 中。也就是说，用户同样可以利用 Rime 的同步机制来在多个设备之间同步方案码用户词典。其操作方式如下：

### 固定和取消固定

在有编码且选中了一个未固定的词时，`Control+;` 可以固定该候选至当前位置。例如，当 `bma` 的第一候选词为「编码」时，按下 `Control+;`，该词出现「📌」标志，表示已经固定到第一位：
![rime](https://images.tansongchen.com/1765501239.png)

在有编码且选中了一个已固定的词时，`Control+;` 可以取消固定该候选。例如，当 `xsi` 的第一候选词为「现实」且被固定时（这是内置的固顶词），按下 `Control+;`，该词「📌」标志消失，表示不再被固定到第一位：
![rime](https://images.tansongchen.com/1765501476.png)

### 自由加词

在有编码时，按下 `Control+'` 之后候选框消失，以任意方式输入想加的词，再按一下 `Control+'` 即将词加到该编码第一个可用的候选位置上。例如，按下 `cctv` → `Control+'` → 输入「中国中央电视台」→ `Control+'`，则「中国中央电视台」添加为 `cctv` 的第一候选词。
![rime](https://images.tansongchen.com/1765501883.png)
再例如，按下 `dna` → `Control+'` → 输入「脱氧核糖核酸」→ `Control+'`，此时 `dna` 已经有固定的第一候选词为「半」，则「脱氧核糖核酸」添加为 `dna` 的第二候选词。
![rime](https://images.tansongchen.com/1765501746.png)

### 前移和后移

在有编码且选中了一个已固定的词时，按 `Control+[` 将已经固定的候选前移，`Control+]` 将已经固定的词后移。如果前移和后移的过程中遇到其他已经固定的词，则会交换位置。例如，这里 `fmje` 对应「吧」和「邑」两个候选，
![rime](https://images.tansongchen.com/1765500571.png)
但「吧」已经有了 `fa` 编码，所以可以在编码为 `fmje` 时按 `Control+]` 把「吧」往后移一位。结果如下：
![rime](https://images.tansongchen.com/1765500649.png)　

### 重置

在有编码时，按下 `Control+\` 将当前编码上所有的自定义取消。

---

用户可以使用 `snow_{{ $frontmatter.name }}.custom.yaml` 定制上述几种操作的快捷键：

```yaml
patch:
  translator/fix_key: "Control+semicolon" # 固定和取消固定
  translator/add_key: "Control+apostrophe" # 自由加词
  translator/up_key: "Control+bracketleft" # 前移
  translator/down_key: "Control+bracketright" # 后移
  translator/reset_key: "Control+backslash" # 重置
```
<!-- #endregion schema-userdb -->
