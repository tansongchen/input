# 冰雪拼音

冰雪拼音是一系列中文输入方案，探索带调拼音、字形辅助、顶功和前缀码等输入方式，让输入更精准、流畅，并适应个人的用词习惯。

本仓库维护冰雪拼音的文档网站，包含方案教程、网页输入体验、编码示例、字根练习和评测资料，使用 VitePress、Vue 3 和 TypeScript 构建。输入方案的配置、词库及 Lua 实现由 [rime-snow-pinyin](https://github.com/rimeinn/rime-snow-pinyin) 仓库维护。

## 阅读与体验

- [在线文档](https://input.tansongchen.com)：阅读教程，在支持的方案页面中直接体验输入。
- [方案总览](snow.md)：了解各方案的设计思路及联系。
- [设计理念](philosophy.md)：了解冰雪拼音的设计原则。
- [冰雪注音](https://input.tansongchen.com/pronunciation)：为中文文本添加注音。
- [交流 QQ 群](https://qm.qq.com/q/vI6avK1YT6)：交流使用体验与问题。

### 方案入口

| 方案 | 主要特点 | 文档 |
| --- | --- | --- |
| 冰雪四拼 | 带调音码，以词为单位，支持顶功输入 | [教程](snow4/index.md) |
| 冰雪三拼 | 使用声调取代键道辅助码，以词为单位 | [教程](snow3/index.md) |
| 冰雪二拼 | 带调拼音与字根辅助相结合，提供多种顶功模式 | [教程](snow2/index.md) |
| 冰雪一拼 | 双手并击输入带调音节，采用顶功规则 | [教程](snow1/index.md) |
| 冰雪键道 | 基于星空键道，提供自动造词、动态码长与动态调频 | [教程](snow-jiandao/index.md) |
| 冰雪清韵 | 音码词语与形码单字相结合，采用前缀码 | [教程](snow-qingyun/index.md) |
| 冰雪飞花 | 以声母和字根编码，提供多种顶功模式 | [教程](snow-feihua/index.md) |

### 安装输入方案

先安装适用于自己平台的 Rime 前端，再按照[首页的安装说明](https://input.tansongchen.com/#下载安装)，从[方案发布页](https://github.com/rimeinn/rime-snow-pinyin/releases)下载方案文件并部署。各方案的发布与支持情况以安装说明及对应版本为准。

## 本地开发

需要安装 Bun；首次准备网页输入体验的依赖和资源时，还需要 `wget` 及网络连接。在仓库根目录执行：

```sh
bun install
bun run install-rime
bun run install-snow
bun run start
```

打开终端提示的地址，默认是 `http://localhost:2024`。其中，`install-rime` 安装网页输入所需的 Fcitx5/Rime WebAssembly 包，`install-snow` 将编译后的方案包下载到 `public/`。资源准备好后，日常开发只需执行 `bun run start`。

### 常用命令

| 命令 | 用途 |
| --- | --- |
| `bun run build-only` | 使用已准备好的依赖和资源构建站点，输出到 `.vitepress/dist/` |
| `bun run build` | 下载指定版本资源、更新模拟结果，再构建站点 |
| `bun run preview` | 本地预览构建后的站点 |
| `bun run simulate` | 更新文档示例的候选框模拟缓存 |
| `bun run simulate --force` | 强制重新生成全部模拟结果 |
| `bun run export` | 按方案导出 PDF 教程，保存到 `pdf/` |
| `bun run format:check` | 检查代码格式 |
| `bun run format` | 自动格式化代码 |

### 候选框模拟

文档中的候选框示例读取 `src/simulation.json`。开发服务器和构建过程会扫描文档、复用已有缓存，并尝试补充缺失的模拟结果。

新增或修改按键示例时，需要让 `PATH` 中可找到 `rime_api_console`，并在相邻目录准备带有已编译词典的方案仓库：

```text
父目录/
├── input/                  # 本仓库
└── rime-snow-pinyin/        # 方案仓库，含编译后的 build/ 词典
```

修改示例后运行 `bun run simulate`；方案逻辑或词库发生变化后，运行 `bun run simulate --force`，并检查生成的缓存差异。仅修改文字且示例缓存完整时，无需重新模拟。

## 仓库结构

```text
├── index.md、snow.md 等     # 首页、方案总览与通用文档
├── snow1/ … snow4/         # 一拼至四拼的教程
├── snow-*/                 # 键道、清韵、飞花的教程与数据
├── components/             # Vue 交互组件与共享文档片段
├── src/                    # 模拟、注音、导出工具及模拟缓存
├── .vitepress/             # 站点配置、主题与 PDF 导出配置
└── public/                 # 字体、图标、PDF 等静态资源
```

## 参与贡献

欢迎修正文档、补充示例或改进交互体验。提交前请阅读 [贡献约定](AGENTS.md)，运行 `bun run format:check` 和 `bun run build-only`，并在本地检查受影响的页面。涉及共享文档片段时，请同时检查引用它的方案页面；涉及模拟示例时，请一并提交更新后的缓存。

当前没有配置自动化测试套件，`src/test.ts` 是手动模拟验证脚本。反馈问题时，请说明方案、操作步骤及预期结果；页面显示或候选框问题可附截图。
