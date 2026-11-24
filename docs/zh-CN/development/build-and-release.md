# 构建与发布

`npm run build` 构建各 workspace 包，并将发布物写入 `packages/components/dist/`。组件包执行 `vite build` 产出 JavaScript、CSS 与静态资源，再执行 `tsc --project tsconfig.build.json --emitDeclarationOnly`，将类型声明写入 `packages/components/dist/types/`。下面这些选择背后的理由记录在 [../adr/](../adr/)，本页是契约本身。

## 构建契约

`packages/components/vite.config.ts` 在 `@vitejs/plugin-react` 之上注册了四个插件来支撑按需引入。改动构建逻辑时若不保住以下契约，就会破坏消费者的 tree-shaking：

- **双格式输出** —— ES 输出到 `dist/es/`，CJS 输出到 `dist/cjs/`，两者都开启 `preserveModules: true` 与 `preserveModulesRoot: 'src'`。消费者可通过 ES 产物摇掉未使用组件的 JavaScript 及其内联资源。不要关掉 `preserveModules`。
- **Externals** —— 库构建将 `react`、`react-dom`、`classnames`、`dayjs`、`naive-icons` 及其子路径标记为 external。`react` 和 `react-dom` 是 peer dependencies。
- **Workspace 源码** —— Vite 通过单独入口将 Hooks 编译为两种 JavaScript 格式，TypeScript 将对应声明写入 `dist/types/hooks/src/`。Less 将 Token 源码编入共享样式表。
- **`cssCodeSplit: true`，样式单入口交付** —— 组件 CSS 按模块拆分，并由 `emitGlobalStyleEntryPlugin` 聚合进 `dist/index.css`，但组件 JavaScript 里**不带任何 CSS 导入**。发布出去的 `import "./x.css"` 是文件式导入，Node 拒绝解析，整个包在纯 Node 里加载失败（`ERR_UNKNOWN_FILE_EXTENSION`），顺着模块图走的 SSR 打包器同样失败。样式统一通过 `@snowcattail/island-design/style` 这一个入口交付。不要关掉 `cssCodeSplit`，也不要把逐组件 CSS 导入加回来。
- **资源不内联** —— `@laynezh/vite-plugin-lib-assets`（`outputPath: 'files'`、`limit: 0`）把字体与图片写到 `dist/files/`，而不是让 library mode 强制内联。
- **全局样式入口** —— `emitGlobalStyleEntryPlugin` 把 `dist/es/` 下的全部 css chunk（module 与普通 css，如 `Cursor/cursor.css`）聚合进 `dist/index.css`（即 `@snowcattail/island-design/style` 指向的文件），随后删除这些已聚合的源 chunk —— 没有任何 JS 再引用它们，留在包里只是体积死重。同时清理 `dist/files/` 里的孤儿资源。改完某个组件的 CSS 后，确认这些样式仍出现在 `dist/index.css` 里。
- **插画是字符串，不是模块** —— 场景 SVG 一律用 `new URL('./x.svg', import.meta.url).href` 引用，绝不用 `import`。用 `import` 会在发布的 JavaScript 里留下 `import x from "../../files/x.svg"`，Node 同样解析不了。Vite 的 library mode 会把这类资源内联成 data URI（`shouldInline` 对 `build.lib` 直接返回 `true`），这也是唯一能在消费方打包器里存活的形式。于是四张插画（约 315 KB SVG）住进了 JavaScript，以百分号编码的 data URI 形式比源文件大约 20%。
- **产物里不许有文件式导入** —— `npm run check:bundle` 扫描 `dist/es` 与 `dist/cjs`，命中 `import` / `require` 任何 `.css`、`.less`、`.svg`、`.png` 之类的文件就失败。发布的 JavaScript 必须能被纯 Node 和 SSR 打包器加载。
- **ESM 兼容的类型声明** —— `scripts/fix-dts-extensions.mjs` 把 `dist/types/` 里的相对说明符改写成 ESM 形式（`./Button` → `./Button.js`，`./components/Button` → `./components/Button/index.js`），并去掉样式副作用导入。本包是 ESM（`"type": "module"`），消费方用 `moduleResolution: "node16"` / `"nodenext"` 时无法解析 `tsc` 从源码原样抄来的无扩展名、目录式说明符 —— 模块图整体解析失败，**所有导出退化成 `any`**，消费方的类型检查被静默关掉（issue #79）。`npm run check:types` 会在 `dist/types/` 里仍有缺扩展名或指向不存在 `.d.ts` 的相对说明符时让构建失败。这与上面的 `rewriteCssAssetUrls` 是同一条纪律：让发布产物去适配本包自己的 exports 契约，而不是让消费方迁就我们的源码风格。
- **字体只留 woff2** —— `stripWoffFallbackPlugin` 删掉与 woff2 一起产出的 woff 备份，字体体积降低约 40%。
- `pruneEmptyDirsPlugin('dist')` 清理上述步骤留下的空目录。

## 包契约

`packages/components/package.json` 已经为按需引入配好，保持这个状态：

- `exports` 把 `.` 映射到 ES / CJS / types 三件套，`./style` 映射到 `dist/index.css`，`./es/*` 映射到保留模块结构的 ES 产物并带 `types` 条件指向 `dist/types/*`，深路径 import 在任何 `moduleResolution` 下都拿得到类型。
- `sideEffects: ["**/*.css", "**/*.less"]` 让打包器可以丢弃未使用的模块。
- `files` 把发布的 tarball 限制在构建产物加 README。
- `dependencies` 包含 `classnames`、`naive-icons`（图标集）和 `dayjs`（日期层，见 [ADR 0005](../adr/0005-dayjs-as-the-date-layer.md)）。Hooks 与 Token 随组件包交付。发布的 JavaScript 保留对这三个 external 运行时依赖的包导入，消费者的打包器解析所用组件可达的导入。不得再新增运行时依赖。

`packages/components/package.json` 中的 `prepublishOnly` 会执行根 workspace 构建与类型声明检查，因此每次发布带出去的都是新鲜产物，且绝不会带上 ESM 模块图解析不了的类型声明。

## 徽章

`npm run badges`（`scripts/generate-coverage-badges.mjs`）读取 `coverage/coverage-summary.json` 与 `coverage/vitest-results.json`，写出 `coverage/badges/coverage.json`，通过扫描 `packages/components/src/components/` 下含有同名 `<Name>.tsx` 的目录统计组件数，并改写 `README.md` 与 `docs/README.zh-CN.md` 里硬编码的 `tests-NN` 和 `components-NN` 徽章。先跑 `npm run test:cov` —— 覆盖率汇总文件缺失时脚本会直接报错退出。

## Demo 站点

`npm run dev` 启动私有 `apps/demo` workspace。`npm run build:demo` 使用本地组件源码构建 demo，输出到 `apps/demo/demo-dist/`。`npm run check:types --workspace=@island-design/demo` 检查类型。npm 发布产物不包含 demo。

在 Vercel 导入仓库时，将仓库根目录设为项目根目录。`vercel.json` 配置构建、静态输出和 SPA 回退。在 GitHub Pages 的 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。`deploy-docs.yml` 在推送 `main` 时构建并部署，并将站点路径传给 Vite。Vercel 可用 `/#/button`，GitHub 默认项目站点可用 `/island-design/#/button`。`npm run deploy` 用于路径为 `/island-design/` 的旧版 Pages 分支发布方式。

## Workspace 子包

私有根包调度 `packages/*` 与 `apps/*` 下的 npm workspaces。`pnpm-workspace.yaml` 列出同一组包。`@snowcattail/island-design` 是组件包，`apps/demo` 是私有演示站点。`@island-design/tokens` 负责 Less 变量和默认 CSS 主题，`@island-design/hooks` 负责带类型的 React Hooks。根构建也会为 tokens 与 hooks 生成独立的 workspace 产物。
