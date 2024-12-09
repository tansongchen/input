---
next:
  text: 基本输入
  link: ./basic
---

冰雪四拼（又称声笔四拼）是一个带调拼音词顶功输入方案，它脱胎于声笔系列码中的声笔拼音方案，但是用声调取代了其中的笔画成分，使其不再涉及字形信息而是成为了纯粹的音码，从而探索了新的输入体验。其设计理念如下：

1. 充分发挥带调拼音的离散能力，降低重码并在短码空间内容纳更多的词；
2. 在声母和韵母不乱序的情况下尽可能优化键位的使用率以及双键组合的顺手程度；
3. 根据「频率为主、语义优先」的思想设置固顶词，使得用户能够快速熟悉高频词的打法，同时大大降低了固顶词的记忆难度。

此外，本方案采用的声母和韵母的定义完全符合《汉语拼音方案》中的原始形式，没有受到全拼特有的正字法的影响。在这个意义上，本方案比一般的双拼方案更加规范。

## 下载安装

首先访问 [Rime 官网](https://rime.im)下载对应平台的 Rime 前端。然后在[冰雪拼音 GitHub 仓库](https://github.com/hanzi-chai/rime-snow-pinyin)上点击 `Code > Download Zip` 下载方案文件，解压缩之后将所有 `snow_` 开头的文件以及 `lua/snow` 文件夹放入您的 Rime 文件夹。

各文件的作用如下：

- `snow_pinyin.schema.yaml`: 全拼方案文件，用于反查
- `snow_pinyin.dict.yaml`: 词库文件（一字词）
- `snow_pinyin.{base,ext,tencent}.dict.yaml`: 词库文件（多字词）
- `snow_pinyin.symbols.yaml`: 特殊符号
- `snow_sipin.schema.yaml`: 四拼方案文件
- `snow_sipin.fixed.txt`: 四拼固顶词
- `snow_stroke.schema.yaml`: 笔画方案文件，用于反查（依赖于 [Rime 五笔画](http://github.com/rime/rime-stroke)，如果您的 Rime 前端不预装五笔画请先安装）
- `lua/snow/*`: 用于实现方案逻辑的 lua 脚本
