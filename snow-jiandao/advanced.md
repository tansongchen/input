<script setup>
import Window from '../components/Window.vue'

const 输入定字一 = "jiandao:xxrr";
const 输入定字二 = "jiandao:chww{Down}{Down}";

const 输入反查一 = "jiandao:azhe";
const 输入反查二 = "jiandao:uviuoa";

const 输入重复 = "jiandao:wyfj i";

const 输入符号 = "jiandao:ia";

const 输入脚本一 = "jiandao:o123";
const 输入脚本二 = "jiandao:o1234*5678";
</script>

# 高级功能

## 以词定字

<!--@include: ../components/advanced.md#word-to-char-->

## 反查

<!--@include: ../components/advanced.md#reverse-lookup-->

## 重复上屏

<!--@include: ../components/advanced.md#repeat-->

## 符号

<!--@include: ../components/advanced.md#symbols-->

## Lua 脚本

<!--@include: ../components/advanced.md#lua-->

## Unicode 码点输入

本方案使用 `o` 引导，例如 `o4e00` 输入“一”、`o20000` 输入“𠀀”。

<!--@include: ../components/advanced.md#unicode-input-->

## 输入统计

输入 `otj` 查看统计说明和各时段报告，例如 `otjr-1` 查看昨天，`otjf` 分列设备，`otjh2026` 合并所有设备的 2026 年统计。

<!--@include: ../components/advanced.md#statistics-->

## 拆分与简词提示

在 Rime 方案选单中开启“拆分”，单字候选的形码后会显示拆分部件。拼音反查时也会显示相应的形码和拆分，方便从字音学习形码。

输入一、二码时，候选还会提示可继续输入的 630 简词；输入较长的常规词码时，如果候选另有 630 简码，注释中会出现 `[630: 编码]`。可以用这些提示逐步熟悉简码，不需要一次背完整张词表。

## 笔画的地区字形

此设置只用于笔画反查，不改变冰雪键道的部件辅助码。

<!--@include: ../components/advanced.md#shape-sources-->

## 编辑与切换

`Control` 在键盘上通常标为 `Ctrl` 或 `⌃`。有编码时，可用 `Control+p/n/b/f` 代替上、下、左、右，`Control+a/e` 移到开头或末尾，`Control+h` 退格，`Control+d` 删除，`Control+g` 取消当前输入。

| 操作 | 按键 |
| --- | --- |
| 切换下一个方案 | `Control+Shift+1` |
| 切换中西文 | `Control+Shift+2` |
| 切换全半角 | `Control+Shift+3` |
| 切换简繁 | `Control+Shift+4` |
| 切换中西文标点 | `Control+Shift+5` |

在 Rime 方案选单中切换“整句／顶功”模式。`Control+j` 切换缓冲开关，分段输入后确认整段时自动退出。也可输入 `o` 并选择“📝 开启缓冲”直接开启。固定、加词和移动候选的快捷键见[方案码用户词典](./basic#方案码用户词典)。前端或系统占用组合键时，可通过前端菜单或 Rime 方案选单操作。

## 方案文件

- `snow_jiandao.schema.yaml`: 冰雪键道方案文件
- `snow_jiandao.fixed.txt`: 冰雪键道固定词
- `snow_jiandao_jianpin.schema.yaml`: 用于生成冰雪键道三四字词的拼写运算
- `snow_jiandao_chaifen.{schema,dict}.yaml`: 冰雪键道的拆分
- `snow_jiandao_bihua.schema.yaml`: 按照键道笔画位置重新映射的笔画拼写运算

通用依赖文件如下；安装时保留完整方案包即可：

<!--@include: ../components/advanced.md#common-files-->
