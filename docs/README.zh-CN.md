# Island Design

<div align="center">
  <img src="../docs/img/logo.png" alt="Island Design" width="180" />
  <p>拥有 42 个组件与可组合设计系统的治愈海岛风 React 组件库。</p>
  <p>
    <a href="https://www.npmjs.com/package/island-design"><img src="https://img.shields.io/npm/v/island-design?label=npm" alt="npm 版本" /></a>
    <a href="../LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT 许可证" /></a>
    <img src="https://img.shields.io/badge/React-18%2B-61dafb" alt="React 18 及以上" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-blue" alt="TypeScript 5.7" />
    <img src="https://img.shields.io/badge/components-42-orange" alt="42 个组件" />
  </p>
  <p><a href="../README.md">English</a> · 简体中文</p>
</div>

## 快速开始

```bash
npm install island-design
```

```tsx
import { Button, Card } from 'island-design';
import 'island-design/style';

export function Welcome() {
    return (
        <Card>
            <Button type="primary">探索海岛</Button>
        </Card>
    );
}
```

React 与 React DOM 是 peer dependencies。请在应用入口导入一次样式文件。

## 架构

```text
island-design/
├── packages/
│   ├── tokens/             @island-design/tokens：Less Token 与 CSS 主题
│   └── hooks/              @island-design/hooks：带类型声明的 React Hooks
├── src/
│   ├── components/         42 个公开组件
│   ├── internal/           私有共享逻辑
│   └── styles/             组件库样式入口、字体与重置样式
├── demo/                   交互示例
├── scripts/                生成器与产物检查
└── docs/                   设计系统与开发契约
```

根 npm workspace 是发布的 <code>island-design</code> 包；<code>pnpm-workspace.yaml</code> 为 pnpm 描述相同的子包。tokens 包管理 Less 变量与默认 CSS 自定义属性主题；hooks 包独立构建 ESM 入口与 TypeScript 声明，提供受控状态、焦点恢复和文档事件监听 Hooks。

## 四项核心工程特性

| 特性           | 能力                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------ |
| Workspace 子包 | Token 与 Hooks 各有独立包边界和构建流程。                                                        |
| 双模块产物     | ESM 与 CJS 保留组件模块结构；声明文件适配 NodeNext。                                             |
| 显式样式入口   | 组件 CSS 汇总到 <code>island-design/style</code>；仅样式文件标记为副作用。                       |
| 生成器与门禁   | 组件模板带 Props、Less Modules、测试和 axe-core 无障碍用例；格式、Lint、类型与构建检查守护产物。 |

### ESM、CJS 与 Tree Shaking

包的 export map 将 <code>import</code> 指向 <code>dist/es/index.js</code>，将 <code>require</code> 指向 <code>dist/cjs/index.cjs</code>，并提供 <code>dist/types/index.d.ts</code>。两种构建都通过 Rollup <code>preserveModules</code> 保留模块结构。消费方打包器可以移除未使用的 JavaScript 组件，实际效果取决于打包器和导入方式。<code>sideEffects</code> 列表保留 CSS 与 Less 导入。全局样式是独立入口，由应用决定何时加载。

export map 还提供 <code>island-design/es/*</code> 深层 ESM 路径。普通应用建议从公开根入口导入。

## Design Token 与主题

Token 源码分为三层：原始 Less 值、语义 CSS 变量、默认主题映射。组件使用 <code>--island-primary-color</code>、<code>--island-text-color</code> 和 <code>--island-border-radius-base</code> 等变量。加载样式后即可覆盖：

```css
:root {
    --island-primary-color: #247c78;
    --island-primary-color-hover: #32958f;
    --island-border-radius-base: 12px;
}
```

Token 包还提供 <code>@island-design/tokens/variables.less</code> 与 <code>@island-design/tokens/theme.less</code> 的 Less 源码出口。完整变量见[设计 Token](./design-system/design-tokens.md)。

## 组件矩阵

| 类型       | 组件                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| 通用与布局 | Button、Card、Divider、Footer、Title、Background、Cursor、BackTop                                         |
| 表单与输入 | Input、Checkbox、Radio、Switch、Select、Rate、Form、Upload、TimePicker、DatePicker                        |
| 数据与展示 | Badge、Avatar、Image、Table、Pagination、Progress、Chart、CodeBlock、CountUp、Countdown、Time、Typewriter |
| 导航与浮层 | Tabs、Collapse、Carousel、Modal、Drawer、Tooltip、Notification                                            |
| 反馈与氛围 | Loading、Skeleton、NoData、Calendar、Tag                                                                  |

42 个组件位于 [src/components](../src/components)，使用示例位于 [demo](../demo)，设计规则位于[设计系统](./design-system/README.md)。

## 生成组件

```bash
npm run gen MyComponent -- --dry-run
npm run gen MyComponent
```

生成器要求 PascalCase，写入前检查重名。它生成组件、Props 接口、Less Module、带 axe-core 的 Vitest 测试和导出入口。dry run 只列出拟生成文件。例如，<code>npm run gen Badge -- --dry-run</code> 会提示 Badge 已存在。

生成后，请将组件加入 demo、设计系统中英文文档和本地 skill 引用，再运行 <code>npm run ci</code>，确保组件矩阵扩展时文档门禁继续准确。

## 开发

```bash
npm install
npm run dev
npm run format:check
npm run lint
npm run typecheck
npm run test:run
npm run build
```

<code>npm run ci</code> 还检查文档对齐、打包安全与声明解析。开发流程见[贡献指南](../CONTRIBUTING.md)。项目采用 [MIT](../LICENSE) 许可证。
