<script setup>
import Window from '../components/Window.vue'

const 输入注解一 = "qingyun:dvme";
const 输入注解二 = "qingyun:dvme{Control+u}";

const 输入定字一 = "qingyun:xxrr";
const 输入定字二 = "qingyun:cweI{Down}{Down}{Down}{Down}{Down}";

const 拼音反查键 = "`";
const 笔画反查键 = "`";
const 输入反查一 = "qingyun:`zhe";
const 输入反查二 = "qingyun:`eiuoa";

const 重复键 = "`";
const 输入重复 = "qingyun:cfu? `";
</script>

# 高级功能

## Unicode 注解

<!--@include: ../components/advanced.md#unicode-->

## 以词定字

<!--@include: ../components/advanced.md#word-to-char-->

## 反查

由于冰雪清韵同时支持形码和音码输入，所以可以在不需要引导键的情况下直接用拼音输入单个汉字并显示相应的形码。

<Window input="qingyun:yi" />

除此之外，还提供拼音（即全拼）反查和笔画反查：

<!--@include: ../components/advanced.md#reverse-lookup-->

## 重复上屏

<!--@include: ../components/advanced.md#repeat-->

## 拆分与单字模式

按 `Control+t` 切换拆分显示，候选注释中会列出单字的字根拆分，便于核对取码。再次按下恢复隐藏。

候选位于第一页时，`Shift+Tab` 切换“字词／单字”，可临时过滤多字词，上屏后恢复默认设置；候选位于后续页时，`Shift+Tab` 用于向前翻页。

## Lua 脚本

本方案用两个反引号引导 Lua 功能，单个反引号仍用于反查和重复上屏。输入时两个反引号连续按下，后接命令：

| 输入 | 功能 |
| --- | --- |
| <code>&#96;&#96;123</code> | 中文数字，包含小写、大写和简繁形式 |
| <code>&#96;&#96;2026n10y26r</code> | 数字与年月日单位逐字转换 |
| <code>&#96;&#96;1234*5678</code> | 计算表达式 |
| <code>&#96;&#96;sqrt(16);</code> | 计算平方根，分号结束表达式 |
| <code>&#96;&#96;rq</code> | 日期 |
| <code>&#96;&#96;sj</code> | 时间 |
| <code>&#96;&#96;rs</code> | 日期与时间 |

数字单位 `s`、`b`、`q`、`w`、`n`、`y`、`r` 分别表示十、百、千、万、年、月、日；与数字混输时逐字转换，不自动改成整数读法。

## Unicode 码点输入

两个反引号后输入码点，例如 <code>&#96;&#96;4e00</code> 输入“一”、<code>&#96;&#96;20000</code> 输入“𠀀”。

<!--@include: ../components/advanced.md#unicode-input-->

## 输入统计

两个反引号后输入 `tj` 查看统计，例如 <code>&#96;&#96;tjr-1</code> 查看昨天，<code>&#96;&#96;tjf</code> 分列设备，<code>&#96;&#96;tjh2026</code> 合并所有设备的 2026 年统计。

<!--@include: ../components/advanced.md#statistics-->

本方案排除 Lua 功能输入时，将上例的配置改为：

```yaml
patch:
  statistics/exclude: ["``.*"]
```

## 笔画的地区字形

此设置只用于笔画反查，不改变本方案的形码。

<!--@include: ../components/advanced.md#shape-sources-->

## 编辑与切换

`Control` 在键盘上通常标为 `Ctrl` 或 `⌃`。有编码时，可用 `Control+p/n/b/f` 代替上、下、左、右，`Control+a/e` 移到开头或末尾，`Control+h` 退格，`Control+d` 删除，`Control+g` 取消当前输入。

| 操作 | 按键 |
| --- | --- |
| 切换下一个方案 | `Control+Shift+1` |
| 切换中西文 | `Control+Shift+2` |
| 切换全半角 | `Control+Shift+3` |
| 切换中西文标点 | `Control+Shift+5` |

在 Rime 方案选单中切换“全息／前缀”模式。本方案简繁通打，不提供简繁转换开关。`Control+j` 切换缓冲开关，分段输入后确认整段时自动退出。固定、加词和移动候选的快捷键见[方案码用户词典](./basic#方案码用户词典)。前端或系统占用组合键时，可通过前端菜单或 Rime 方案选单操作。

## 方案文件

- `snow_qingyun.{schema,dict}.yaml`: 冰雪清韵方案文件
- `snow_qingyun_xingma.schema.yaml`: 冰雪清韵形码部分的方案文件
- `snow_qingyun.fixed.txt`: 冰雪清韵固定词
- `snow_qingyun_chaifen.{schema,dict}.yaml`: 冰雪清韵的拆分

通用依赖文件如下；安装时保留完整方案包即可：

<!--@include: ../components/advanced.md#common-files-->
