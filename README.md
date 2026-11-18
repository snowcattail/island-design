# Island Design

<div align="center">
  <img src="./docs/img/logo.png" alt="Island Design" width="180" />
  <p>A cozy React component library with 42 components and a composable design system.</p>
  <p>
    <a href="https://www.npmjs.com/package/island-design"><img src="https://img.shields.io/npm/v/island-design?label=npm" alt="npm version" /></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT license" /></a>
    <img src="https://img.shields.io/badge/React-18%2B-61dafb" alt="React 18 or newer" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-blue" alt="TypeScript 5.7" />
    <img src="https://img.shields.io/badge/components-42-orange" alt="42 components" />
  </p>
  <p>English · <a href="./docs/README.zh-CN.md">简体中文</a></p>
</div>

## Quick start

```bash
npm install island-design
```

```tsx
import { Button, Card } from 'island-design';
import 'island-design/style';

export function Welcome() {
    return (
        <Card>
            <Button type="primary">Explore the island</Button>
        </Card>
    );
}
```

React and React DOM are peer dependencies. Import the stylesheet once at the application entry point.

## Architecture

```text
island-design/
├── packages/
│   ├── tokens/             @island-design/tokens: Less tokens and CSS theme
│   └── hooks/              @island-design/hooks: typed React hooks
├── src/
│   ├── components/         42 public components
│   ├── internal/           shared private behavior
│   └── styles/             library stylesheet entry, fonts and reset
├── demo/                   interactive component examples
├── scripts/                generator and artifact checks
└── docs/                   design system and development contracts
```

The root npm workspace is the published <code>island-design</code> package. <code>pnpm-workspace.yaml</code> describes the same packages for pnpm users. The tokens package owns Less variables and the default CSS custom property theme. The hooks package builds an independent ESM entry and TypeScript declarations for controlled state, focus restoration, and document event listeners.

## Four engineering foundations

| Foundation          | What it provides                                                                                                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Workspace packages  | Shared tokens and hooks have their own package boundaries and builds.                                                                          |
| Dual module output  | ESM and CJS builds preserve the component module graph; declarations are normalized for NodeNext consumers.                                    |
| Explicit styles     | Component CSS is collected into <code>island-design/style</code>; style files alone are marked as side effects.                                |
| Generator and gates | A component scaffold includes props, Less Modules, tests and an axe-core smoke case; format, lint, type and build checks protect the artifact. |

### ESM, CJS and tree shaking

The package export map selects <code>dist/es/index.js</code> for <code>import</code>, <code>dist/cjs/index.cjs</code> for <code>require</code>, and <code>dist/types/index.d.ts</code> for TypeScript. ESM and CJS builds keep modules separate with Rollup <code>preserveModules</code>. Bundlers can discard unused JavaScript components; actual removal depends on the consumer bundler and import pattern. The <code>sideEffects</code> list retains CSS and Less imports. The global stylesheet is deliberately separate, so applications choose when to load it.

For a deep ESM import, the export map also exposes paths under <code>island-design/es/*</code>. Use the public root entry for ordinary applications.

## Design tokens and themes

The token source has three layers: primitive Less values, semantic CSS variables, and the default theme mapping. Components use variables such as <code>--animal-primary-color</code>, <code>--animal-text-color</code>, and <code>--animal-border-radius-base</code>. Override them after loading the stylesheet:

```css
:root {
    --animal-primary-color: #247c78;
    --animal-primary-color-hover: #32958f;
    --animal-border-radius-base: 12px;
}
```

The token package also exports its Less source through <code>@island-design/tokens/variables.less</code> and <code>@island-design/tokens/theme.less</code>. See [design tokens](./docs/design-system/design-tokens.md) for the complete vocabulary.

## Component matrix

| Area                    | Components                                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| General and layout      | Button, Card, Divider, Footer, Title, Background, Cursor, BackTop                                         |
| Forms and input         | Input, Checkbox, Radio, Switch, Select, Rate, Form, Upload, TimePicker, DatePicker                        |
| Data and display        | Badge, Avatar, Image, Table, Pagination, Progress, Chart, CodeBlock, CountUp, Countdown, Time, Typewriter |
| Navigation and overlays | Tabs, Collapse, Carousel, Modal, Drawer, Tooltip, Notification                                            |
| Feedback and atmosphere | Loading, Skeleton, NoData, Calendar, Tag                                                                  |

All 42 components are under [src/components](./src/components). Their usage examples are in [demo](./demo); design rules are in [docs/design-system](./docs/design-system/README.md).

## Generate a component

```bash
npm run gen MyComponent -- --dry-run
npm run gen MyComponent
```

The generator requires PascalCase and rejects an existing name before writing. It creates a component, Props interface, Less Module, colocated Vitest test with axe-core, and barrel exports. Dry run only prints the planned files. For example, <code>npm run gen Badge -- --dry-run</code> reports a collision because Badge already exists.

After generation, add the component to the demo and the English/Chinese design system documentation and local skill reference, then run <code>npm run ci</code>. This keeps the repository's 42-component documentation gate accurate when the matrix grows.

## Development

```bash
npm install
npm run dev
npm run format:check
npm run lint
npm run typecheck
npm run test:run
npm run build
```

<code>npm run ci</code> also checks documentation alignment, bundle safety, and declaration resolution. See [contributing](./CONTRIBUTING.md) for the development workflow. Released under [MIT](./LICENSE).
