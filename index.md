---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 众妙斋
  text: 冰雪拼音
  tagline: 优雅、高效、个性化的中文输入体验
  actions:
    - theme: brand
      text: 方案成果
      link: /snow4
    - theme: alt
      text: 顶功集萃
      link: https://ding.tansongchen.com
    - theme: alt
      text: 自动拆分
      link: https://chaifen.app

features:
  - title: 冰雪四拼
    details: 音码、主打词组、二码顶/三码顶/四码顶
    link: /snow4
  - title: 冰雪三拼
    details: 音码、主打词组、三码顶/四码顶
    link: /snow3
  - title: 冰雪双拼
    details: 音形码、主打单字、二码顶
    link: /snow2
  - title: 冰雪一拼
    details: 形音码、主打单字、四二顶
    link: /snow1
---

冰雪拼音是一系列创新性的中文输入方案的总称。它们使用先进的离散优化技术来设计，并采取独特的顶功和智能化技术来实现。这些输入方案充分利用汉字的字音和字形两方面信息对汉字编码，不仅使得编码优雅、高效，还能通过学习用户的语言习惯来个性化输入体验。

## 下载安装

首先安装对应于您的平台的 [Rime 输入法前端](https://rime.im/download/)。然后点击[此链接](https://github.com/rimeinn/rime-snow-pinyin)下载冰雪拼音方案文件，解压缩之后放入您的用户文件夹。

各文件的作用如下：

### 通用文件

- `snow_pinyin.schema.yaml`: 全拼方案文件，用于反查
- `snow_pinyin.dict.yaml`: 词库文件（一字词）
- `snow_pinyin.{base,ext,tencent}.dict.yaml`: 词库文件（多字词）
- `snow_pinyin.symbols.yaml`: 特殊符号
- `snow_stroke.schema.yaml`: 笔画方案文件，用于反查（依赖于 [Rime 五笔画](http://github.com/rime/rime-stroke)，如果您的 Rime 前端不预装五笔画请先安装）
- `lua/snow/*`: 用于实现方案逻辑的 lua 脚本

### 冰雪四拼

- `snow_sipin.schema.yaml`: 四拼方案文件
- `snow_sipin.fixed.txt`: 四拼固顶词

### 冰雪三拼

- `snow_sanpin_xkjd.schema.yaml`: 三拼键道方案文件
- `snow_sanpin_xkjd.fixed.txt`: 三拼键道固顶词
- `snow_sanpin_zrm.schema.yaml`: 三拼自然码方案文件
- `snow_sanpin_zrm.fixed.txt`: 三拼自然码固顶词
- `snow_sanpin_flypy.schema.yaml`: 三拼小鹤方案文件
- `snow_sanpin_flypy.fixed.txt`: 三拼小鹤固顶词

您可以点击各个方案以进一步了解并选择适合您的输入方案。
