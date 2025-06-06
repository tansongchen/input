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
      link: /snow
    - theme: alt
      text: 顶功集萃
      link: https://ding.tansongchen.com
    - theme: alt
      text: 自动拆分
      link: https://chaifen.app

features:
  - title: 冰雪四拼
    details: 音码、主打词组、二三四码顶
    link: /snow4/
  - title: 冰雪三拼
    details: 音码、主打词组、三四码顶
    link: /snow3/
  - title: 冰雪双拼
    details: 音形码、字词均衡、二码顶
    link: /snow2/
  - title: 冰雪一拼
    details: 音形码、字词均衡、一码顶、并击
    link: /snow1/
---

冰雪拼音是一系列以普通话拼音为基础的中文输入方案。它们充分利用汉字的字音信息来实现自然优雅的编码；它们使用先进的离散优化技术和顶功技术来设计，使得编码十分高效；它们配备了智能算法，通过学习用户的语言习惯来个性化输入体验。

## 下载安装

首先安装对应于您的平台的 [Rime 输入法前端](https://rime.im/download/)。然后点击 [GitHub 发布页面](https://github.com/rimeinn/rime-snow-pinyin/releases/latest)下载其中的冰雪拼音方案文件（`snow-pinyin.zip`），解压缩之后放入您的用户文件夹。各文件的作用如下：

### 通用文件

- `snow_pinyin.schema.yaml`: 全拼方案文件及通用配置
- `snow_pinyin.*.dict.yaml`: 词库文件
- `snow_stroke.schema.yaml`: 笔画方案文件，用于反查（依赖于 [Rime 五笔画](http://github.com/rime/rime-stroke)，如果您的 Rime 前端不预装五笔画请先安装）
- `lua/snow/*`: 用于实现方案逻辑的 Lua 脚本

### 方案专用文件

安装包中包含[冰雪四拼](/snow4/)、[冰雪三拼](/snow3/)和[冰雪一拼](/snow1/)三个方案，而[冰雪双拼](/snow2/)还在研发中。各个方案专用的文件如下：

- `snow_sipin.schema.yaml`: 四拼方案文件
- `snow_sipin.fixed.txt`: 四拼固顶词
- `snow_sanpin.schema.yaml`: 三拼方案文件
- `snow_sanpin.fixed.txt`: 三拼固顶词
- `snow_yipin.schema.yaml`: 一拼方案文件
- `snow_yipin.fixed.txt`: 一拼固顶词

## 了解方案

冰雪拼音包含上述 4 个互相有联系但又各不相同的方案。您可以阅读[冰雪奇缘](/snow)来概览各个方案，了解它们的设计理念及优缺点。您还可以点击上述各个方案的链接以进一步了解并选择适合您的输入方案。
