<script setup>
import Window from '../components/Window.vue'

const 输入定字一 = "sanpin:xxrr";
const 输入定字二 = "sanpin:chww{Down}{Down}";

const 输入反查一 = "sanpin:azhe";
const 输入反查二 = "sanpin:uviuoa";

const 输入重复 = "sanpin:wyfj i";

const 输入符号 = "sanpin:ia";

const 输入脚本一 = "sanpin:o123";
const 输入脚本二 = "sanpin:o1234*5678";

const 输入辅助码一 = "sanpin:ytivi{Down}{Down}{Down}";
const 输入辅助码三 = "sanpin:xzivv";
const 输入辅助码四 = "sanpin:xzi1e";
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

## 辅助码

### 笔画辅助码

<!--@include: ../components/advanced.md#auxiliary-bihua -->

### 部首辅助码

<!--@include: ../components/advanced.md#auxiliary-bushou -->

## 附录：非成字部首的读音

<!--@include: ../components/advanced.md#radical-reading-->

## Unicode 码点输入

本方案使用 `o` 引导，例如 `o4e00` 输入“一”、`o20000` 输入“𠀀”。

<!--@include: ../components/advanced.md#unicode-input-->

## 输入统计

输入 `otj` 查看统计说明和各时段报告，例如 `otjr-1` 查看昨天，`otjf` 分列设备，`otjh2026` 合并所有设备的 2026 年统计。

<!--@include: ../components/advanced.md#statistics-->

## 笔画的地区字形

本方案的笔画辅助码与笔画反查共用这项设置。

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

- `snow_sanpin.schema.yaml`: 冰雪三拼方案文件
- `snow_sanpin.fixed.txt`: 冰雪三拼固定词
- `snow_bushou.{schema,dict}.yaml`: 与冰雪四拼共用的部首辅助码
- `snow_jiandao_jianpin.schema.yaml`: 与冰雪键道共用的多字词简拼棱镜

通用依赖文件如下；安装时保留完整方案包即可：

<!--@include: ../components/advanced.md#common-files-->
