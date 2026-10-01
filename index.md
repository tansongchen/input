---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 众妙斋
  text: 冰雪拼音
  tagline: 优雅、高效、个性化的中文输入体验
  image:
    src: /snow.svg
    alt: VitePress
  actions:
    - theme: brand
      text: 方案总览
      link: /snow
    - theme: brand
      text: QQ 群
      link: https://qm.qq.com/q/vI6avK1YT6
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
  - title: 冰雪二拼
    details: 音形码、字词均衡、三四码顶
    link: /snow2/
  - title: 冰雪一拼
    details: 音形码、字词均衡、一码顶、并击
    link: /snow1/
  - title: 冰雪键道
    details: 音形码、字词均衡、三四码顶
    link: /snow-jiandao/
  - title: 冰雪飞花
    details: 音形码、主打单字、二码顶
    link: /snow-feihua/
  - title: 冰雪清韵
    details: 形码、主打单字、前缀码
    link: /snow-qingyun/
---

冰雪拼音是一系列以普通话拼音为基础的中文输入方案。它们充分利用汉字的字音信息来实现自然优雅的编码；它们使用先进的离散优化技术和顶功技术来设计，使得编码十分高效；它们配备了智能算法，通过学习用户的语言习惯来个性化输入体验。您可以点击链接加入群聊【冰雪拼音】与群友一同交流：https://qm.qq.com/q/vI6avK1YT6 。

## 下载安装

首先安装对应于您的平台的 [Rime 输入法](https://rime.im)前端。在各个平台上，我们推荐的前端分别是：

- Windows：[小狼毫输入法](https://github.com/rime/weasel/releases)
- macOS：[小企鹅输入法 macOS](https://github.com/fcitx-contrib/fcitx5-macos-installer/blob/master/README.zh-CN.md)
- Linux：[小企鹅输入法](https://fcitx-im.org/wiki/Install_Fcitx_5/zh-cn)
- Android：[同文输入法](https://github.com/osfans/trime/releases)
- iOS：[元书输入法](https://apps.apple.com/us/app/%E5%85%83%E4%B9%A6%E8%BE%93%E5%85%A5%E6%B3%95/id6744464701?l=zh-Hans-CN)
- HarmonyOS：[超越输入法](https://appgallery.huawei.com/app/detail?id=app.flytype.hmos.bim&channelId=SHARE)

然后点击 [GitHub 发布页面](https://github.com/rimeinn/rime-snow-pinyin/releases/latest)下载其中的冰雪拼音方案文件（`snow-pinyin.zip`），解压缩之后放入您的用户文件夹。各文件的作用如下：

### 通用文件

- `snow_pinyin.schema.yaml`: 全拼方案文件及通用配置
- `snow_pinyin*.dict.yaml`: 词库文件
- `snow_bihua.schema.yaml`, `stroke.schema.yaml`, `stroke.dict.yaml`: 笔画方案文件，用于反查
- `lua/snow/*`: 用于实现方案逻辑的 Lua 脚本

### 方案专用文件

安装包中包含[冰雪四拼](/snow4/)、[冰雪三拼](/snow3/)、[冰雪一拼](/snow1/)、[冰雪键道](/snow-jiandao/)、[冰雪清韵](/snow-qingyun/)五个方案，其余方案正在研发中。各个方案专用的文件如下：

- 冰雪四拼
  - `snow_sipin.schema.yaml`: 冰雪四拼方案文件
  - `snow_sipin.fixed.txt`: 冰雪四拼固顶词
  - `snow_bushou.{schema,dict}.yaml`: 用于冰雪四拼的部首辅助码
- 冰雪三拼
  - `snow_sanpin.schema.yaml`: 冰雪三拼方案文件
  - `snow_sanpin.fixed.txt`: 冰雪三拼固顶词
- 冰雪一拼
  - `snow_yipin.schema.yaml`: 冰雪一拼方案文件
  - `snow_yipin.fixed.txt`: 冰雪一拼固顶词
  - `snow_xingpang.{schema,dict}.yaml`: 用于冰雪一拼的形旁辅助码
- 冰雪键道
  - `snow_jiandao.schema.yaml`: 冰雪键道方案文件
  - `snow_jiandao.fixed.txt`: 冰雪键道固顶词
  - `snow_jiandao_jianpin.schema.yaml`: 用于生成冰雪键道三四字词的拼写运算
  - `snow_jiandao_chaifen.{schema,dict}.yaml`: 冰雪键道的拆分
  - `snow_jiandao_bihua.schema.yaml`: 按照键道笔画位置重新映射的笔画拼写运算
- 冰雪清韵
  - `snow_qingyun.{schema,dict}.yaml`: 冰雪清韵方案文件
  - `snow_qingyun_xingma.schema.yaml`: 冰雪清韵形码部分的方案文件
  - `snow_qingyun.fixed.txt`: 冰雪清韵固顶词
  - `snow_qingyun_chaifen.{schema,dict}.yaml`: 冰雪清韵的拆分

此外，还有冰雪英拼（`snow_yingpin.{schema,dict}.yaml`）提供以顶功方式输入英文的体验、冰雪零拼（`snow_lingpin.schema.yaml`）用于手机上的键盘切换绑定中英文。

## 了解方案

冰雪拼音包含若干个互相有联系但又各不相同的方案。您可以阅读[冰雪奇缘](/snow)来概览各个方案，了解它们的设计理念及优缺点。您还可以点击上述各个方案的链接以进一步了解并选择适合您的输入方案。
