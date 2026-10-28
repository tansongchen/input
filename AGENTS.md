# 冰雪拼音文档开发约定

始终用中文回复。

## 项目结构与模块组织

本仓库是冰雪拼音的中文文档站点，使用 VitePress 和 Vue 3 构建。

- 根目录的 Markdown 文件提供首页和通用文档。
- `snow1/` 至 `snow4/` 及 `snow-*/` 存放各输入方案的指南，常见文件包括 `index.md`、`basic.md`、`spelling.md` 和 `advanced.md`。
- `components/` 存放 Vue 演示组件，以及供方案页面引用的共享 Markdown 片段。
- `src/` 存放 TypeScript 模拟、注音和 PDF 导出工具；`src/simulation.json` 缓存候选框状态。
- `.vitepress/` 配置导航、主题、构建插件和 PDF 导出；`public/` 存放字体、PDF 和静态资源。

## 构建、测试与开发命令

使用 Bun，并遵循仓库中已提交的 `bun.lock`：

- `bun install`：安装依赖。
- `bun run start`：启动开发服务器，端口为 2024。
- `bun run build-only`：使用现有依赖和资源构建站点。
- `bun run build`：下载指定版本的 Rime 包和方案压缩包，更新模拟结果并构建站点；需要网络和 `wget`。
- `bun run preview`：在本地预览构建后的站点。
- `bun run simulate`：补充缺失的模拟结果；修改方案行为后，使用 `bun run simulate --force` 全量重新模拟。
- `bun run export`：将各方案文档导出为 PDF。
- `bun run format:check` / `bun run format`：检查格式或自动修正。

模拟功能要求 `PATH` 中可找到 `rime_api_console`，且相邻目录 `../rime-snow-pinyin` 中存在方案仓库及已编译的词典。

## 代码风格与命名约定

遵循 `.editorconfig`：使用 UTF-8 编码、LF 换行、两个空格缩进，并保留文件末尾换行。TypeScript 启用严格模式；延续相邻代码中的中文标识符，Vue 组件文件使用大驼峰命名，如 `Window.vue`。文档使用中文，通过 `<!--@include: ...-->` 复用共享片段。

使用 Biome 格式化代码，当前未启用代码静态检查规则。Markdown、公共资源和模拟缓存不参与 Biome 格式化。需要被模拟器扫描的演示变量必须以 `输入` 开头，值使用双引号，格式为 `方案名:按键序列`。

## 测试与验证要求

当前未配置自动化测试框架或覆盖率门槛，`src/test.ts` 用于手动验证模拟结果。提交前运行格式检查和站点构建；在本地检查受影响页面的链接、共享片段、候选框及交互输入行为。修改示例后重新生成模拟结果，并检查缓存差异。

## 提交与合并请求规范

历史提交以简短的动作描述为主，多使用中文，例如 `更新文档`、`添加候选框组件`，未见强制前缀约定。每次提交应聚焦单一主题。合并请求应说明受影响的方案、行为变化和已执行的验证命令，并在适用时关联问题；涉及页面布局或候选框外观变化时附上截图。
