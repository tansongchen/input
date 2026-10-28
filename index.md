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

本页内容：[下载安装](#下载安装) · [更新与常见问题](#更新与常见问题) · [手机皮肤](#手机皮肤) · [个性化与数据管理](#个性化与数据管理) · [了解方案](#了解方案)。

## 下载安装

首先安装对应于您的平台的 [Rime 输入法](https://rime.im)前端。在各个平台上，我们推荐的前端分别是：

- Windows：[小狼毫输入法](https://github.com/rime/weasel/releases)
- macOS：[小企鹅输入法 macOS](https://github.com/fcitx-contrib/fcitx5-macos-installer/blob/master/README.zh-CN.md)
- Linux：[小企鹅输入法](https://fcitx-im.org/wiki/Install_Fcitx_5/zh-cn)
- Android：[同文输入法](https://github.com/osfans/trime/releases)
- iOS：[元书输入法](https://apps.apple.com/us/app/%E5%85%83%E4%B9%A6%E8%BE%93%E5%85%A5%E6%B3%95/id6744464701?l=zh-Hans-CN)
- HarmonyOS：[超越输入法](https://appgallery.huawei.com/app/detail?id=app.flytype.hmos.bim&channelId=SHARE)

从[冰雪拼音发布页面](https://github.com/rimeinn/rime-snow-pinyin/releases/latest)下载 `snow-pinyin.zip`，然后启用所需的方案。同文输入法和元书输入法的键盘外观另见[手机皮肤](#手机皮肤)。

### 启用方案

1. 通过前端的菜单或设置打开 Rime 用户文件夹，将方案包解压到这里。解压后 `snow_sipin.schema.yaml` 等文件应直接位于用户文件夹中，Lua 文件位于其中的 `lua/snow/`，不要多套一层压缩包同名目录。
2. 在用户文件夹中建立或修改 `default.custom.yaml`，把想用的方案加入 `schema_list`。如果已有其他设置，将下面的键合并进已有的 `patch`，保留原来需要的方案。
3. 在前端执行“重新部署”，等待词典编译完成，再打开方案选单选择方案。首次部署的大词库编译可能比以后更新更久。

例如，只启用冰雪四拼和冰雪三拼：

```yaml
patch:
  schema_list:
    - schema: snow_sipin
    - schema: snow_sanpin
```

| 方案 | schema_id |
| --- | --- |
| 冰雪四拼 | `snow_sipin` |
| 冰雪三拼 | `snow_sanpin` |
| 冰雪一拼 | `snow_yipin` |
| 冰雪键道 | `snow_jiandao` |
| 冰雪清韵 | `snow_qingyun` |

## 更新与常见问题

### 更新方案

更新前先备份用户文件夹，并执行一次 Rime 同步。下载新版 `snow-pinyin.zip`，解压覆盖方案文件，再重新部署。更新 Lua 脚本也要重新部署，部署会重新加载脚本。

个人设置写在 `*.custom.yaml` 中；固定词的个性化调整优先使用各方案提供的固定、加词、前移等操作。直接修改随安装包分发的 `*.schema.yaml`、`*.fixed.txt` 或词库文件，下一次覆盖安装时会丢失这些改动。个人词库的维护方式见各方案“顶功编码”中的“词库设置”。

### 常见问题

- **找不到方案**：检查解压位置和 `default.custom.yaml` 中的 `schema_id`，确认部署已完成。一个文件中只保留一个顶层 `patch`。
- **候选为空或按键异常**：检查方案包是否完整，尤其是 `lua/snow/` 和词库文件；查看前端的部署日志，确认词典与 Lua 组件没有加载错误。
- **更新后行为没有变化**：重新部署，并检查个人补丁是否仍覆盖了新版配置。备份后可以暂时移开相关 `*.custom.yaml` 来定位问题。
- **网页示例与本机首选不同**：动态调频会根据个人使用改变排序。先检查编码、模式和候选列表；网页演示不包含您的个人词频。

## 手机皮肤

同文输入法（Android）和元书输入法（iOS）提供相同的七组布局。请从[冰雪拼音发布页面](https://github.com/rimeinn/rime-snow-pinyin/releases/latest)按平台下载皮肤包：

| 前端 | 下载文件 | 使用的皮肤文件 |
| --- | --- | --- |
| 同文输入法（Android） | `snow-pinyin-skins-trime.zip` | `.trime.yaml` 主题文件 |
| 元书输入法（iOS） | `snow-pinyin-skins-hamster.zip` | `.cskin` 皮肤包 |

皮肤控制键盘外观与按键动作，输入方案仍需另外安装 `snow-pinyin.zip` 并重新部署。

### 选择布局

| 皮肤 | 布局特点 |
| --- | --- |
| 俏皮可爱・七色 | 冰雪四拼配套布局，声母与补码分区 |
| 俏皮可爱・七色・无刻 | 同上，隐藏拼音键面文字 |
| 直列 35 键 | 冰雪清韵配套布局，保留编码所需的标点键 |
| 直列 35 键・无刻 | 同上，隐藏拼音键面文字 |
| 键道 35 键 | 冰雪键道布局，带独立数字和符号键盘 |
| 键道 35 键・无刻 | 同上，隐藏拼音键面文字 |
| 直列 45 键 | 通用布局，保留完整字母、数字和常用标点 |

两端每组皮肤均包含浅色和深色配色。元书皮肤文件夹中的 `demo.png` 提供亮暗并排预览；同文使用相同布局和七色配色，以文字和通用符号显示功能键。

冰雪三拼等方案可以根据编码需要选择通用或合适的布局；冰雪一拼需要多键同时按下并松开的并击操作，以上触屏布局没有提供专用的并击键盘。

### 同文输入法导入与使用

1. 解压 `snow-pinyin-skins-trime.zip`，其中有七份 `.trime.yaml` 文件。例如，冰雪四拼可以选择 `俏皮可爱・七色.trime.yaml`。
2. 在同文设置中确认当前使用的 Rime 用户文件夹，将所需的 `.trime.yaml` 文件复制到该文件夹根目录，与 `snow_*.schema.yaml` 放在同一级，不要放进 `build/` 或额外的子文件夹。
3. 执行重新部署，然后在同文的主题设置中选择对应名称的主题，再通过 Rime 方案选单选中所用的冰雪方案。主题布局和输入方案应匹配。

主题包含亮暗配色、上下滑动和长按动作；长按通常与上划执行同一动作。工具栏按所选布局提供“中文”“ABC”“123”或“符号”等入口，用于切换键盘；“选单”动作打开 Rime 方案选单。

普通键盘的标点交给输入方案处理，字母键盘中的符号直接输入；标点和切换开关的具体行为见各方案文档。无刻布局隐藏键面文字，但保留按键与手势动作。

这些主题使用同文的[新版主题工具栏配置](https://github.com/osfans/trime/wiki/Theme-Configuration-%28New%29#三工具栏区tool_bar)，需要支持该配置的同文版本。若主题没有出现在列表中，先检查文件是否以 `.trime.yaml` 结尾、是否放在当前用户文件夹根目录，并确认已经重新部署。

### 元书输入法导入与使用

1. 解压 `snow-pinyin-skins-hamster.zip`，从中选择一份同名 `.cskin` 文件。
2. 将 `.cskin` 文件通过系统分享或元书输入法的皮肤导入入口交给元书输入法，再在皮肤设置中启用。
3. 在元书输入法的 Rime 方案设置中选中所用的冰雪方案；皮肤布局和输入方案应匹配。

不需要逐个导入皮肤文件夹里的 YAML。中英切换键、空格键等按键上的小字表示上划动作，部分布局还有下划动作。中英切换使用皮肤的切换动作；选单入口可打开 Rime 选单选择方案或开关。具有候选菜单的布局还提供固定、前移、后移、加词和重置等动作，其作用与各方案文档里的快捷键相同。

### 更新皮肤

下载对应平台的新版皮肤包：同文替换所用的 `.trime.yaml` 文件后重新部署并选择主题；元书重新导入所用的 `.cskin` 并启用。自己修改过的皮肤先另存备份。希望自行生成或修改布局的用户，可参考仓库的[皮肤生成说明](https://github.com/rimeinn/rime-snow-pinyin/blob/master/scripts/README.md#导出注音和皮肤)。

## 个性化与数据管理

### 使用补丁文件

在 Rime 用户文件夹中建立 `snow_<方案>.custom.yaml`，例如冰雪四拼使用 `snow_sipin.custom.yaml`。把设置写入 `patch` 后重新部署；同一个文件中的多个设置合并在同一个 `patch` 下。已有的补丁要保留，避免直接覆盖。

### 同步、备份与恢复

| 数据 | 文件或目录 | 用途 |
| --- | --- | --- |
| 音节码用户词典 | `snow_pinyin.userdb` | 记录输入过的词和词频，五个方案共用 |
| 方案码用户词典 | `snow_<方案>.userdb` | 保存固定候选、自由加词等个性化设置，冰雪四拼、冰雪三拼、冰雪键道、冰雪清韵各自独立 |
| 输入统计 | `snow_statistics.userdb` | 按方案、日期和设备保存统计 |
| 个人配置和批量词库 | `*.custom.yaml`、个人词典文件 | 保存用户自己维护的源文件 |

在前端执行 Rime 同步后，用户词典会导出为对应的 `*.userdb.txt` 快照，通常位于同步目录下各设备的子目录中。让各设备使用同一个同步位置，再分别执行同步，才能合并其他设备的数据。统计的查询入口见各方案的“高级功能”。

配置文件和自建词库应另外备份；词典同步不等于整个用户文件夹的备份。直接复制整个用户文件夹作备份或恢复时，先退出输入法，避免复制正在写入的数据库。恢复自己的 `*.custom.yaml`、词库和用户词典后重新部署；跨设备合并已有数据应优先使用 Rime 同步。

输入统计按 `installation.yaml` 中的 `installation_id` 区分设备。不同设备应保留各自的标识，不要通过复制该文件把它们变成同一设备；更改标识后，旧统计仍归在原标识下。

## 了解方案

冰雪拼音包含若干个互相有联系但又各不相同的方案。您可以阅读[冰雪奇缘](/snow)来概览各个方案，了解它们的设计理念及优缺点。您还可以点击上述各个方案的链接以进一步了解并选择适合您的输入方案。
