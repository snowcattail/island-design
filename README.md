# Island Design

<div align="center">
    <img src="./docs/img/logo.png" alt="island-design" style="border-radius: 24px; width: 220px; display: block; margin: 0 auto;" />
</div>
<p align="center">
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square" alt="License: MIT"></a>
    <a href="https://www.npmjs.com/package/island-design"><img src="https://img.shields.io/npm/dm/island-design.svg?style=flat-square" alt="Weekly downloads"></a>
    <a href="https://www.npmjs.com/package/island-design"><img src="https://img.shields.io/npm/v/island-design?label=version&style=flat-square" alt="Version"></a>
    <img src="https://img.shields.io/badge/a11y-WAI--ARIA%20APG-brightgreen?style=flat-square" alt="Accessibility">
    <br/>
    <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white" alt="React 19">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
    <a href="https://github.com/snowcattail/island-design/stargazers"><img src="https://img.shields.io/github/stars/snowcattail/island-design?style=flat-square" alt="Stars"></a>
    <a href="https://atomgit.com/snowcattail/island-design"><img alt="AtomGit Star" src="https://atomgit.com/snowcattail/island-design/star/badge.svg"></a>
</p>

<p align="center">
    <a href="https://trendshift.io/repositories/34594?utm_source=trendshift-badge&amp;utm_medium=badge&amp;utm_campaign=badge-trendshift-34594" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/trendshift/repositories/34594/daily?language=TypeScript" alt="snowcattail%2Fisland-design | Trendshift" width="250" height="55"/></a>
    <a href="https://hellogithub.com/repository/snowcattail/island-design" target="_blank"><img src="https://api.hellogithub.com/v1/widgets/recommend.svg?rid=98ecff41d142466d8d72694a6fadf9e9&claim_uid=pyGqTPIRMdo7fBS&theme=neutral" alt="Featured｜HelloGitHub" style="width: 250px; height: 54px;" width="250" height="54" /></a>
    <a href="https://atomgit.com/snowcattail/island-design"><img alt="AtomGit G-Star" src="https://atomgit.com/snowcattail/island-design/star/new_badge.svg"></a>
</p>

<p align="center">
    English | <a href="./docs/README.zh-CN.md">简体中文</a> | <a href="./docs/README.ja.md">日本語</a>
</p>

<h2>
    <img src="./docs/img/icons/bell.svg" width="20" height="27" alt="" align="absmiddle" />
    Introduction
</h2>

A lightweight, cozy React + TypeScript UI component library with an original island-style design language. Every visual element, layout, icon, and animation is crafted from scratch.

<h2>
    <img src="./docs/img/icons/monitor.svg" width="20" height="27" alt="" align="absmiddle" />
    Preview
</h2>

- Online Preview: [island-design](https://snowcattail.github.io/island-design/#/)

<h2>
    <img src="./docs/img/icons/git-branch.svg" width="20" height="27" alt="" align="absmiddle" />
    Related
</h2>

- Icons (**naive-icons**): <https://github.com/snowcattail/naive-icons>
- Vue version (**animal-island-vue**): <https://github.com/snowcattail/animal-island-vue>
- WeChat Mini Program version (**animal-island-wx**): <https://github.com/lns567/animal-island-wx>

<h2>
    <img src="./docs/img/icons/sparkles.svg" width="20" height="27" alt="" align="absmiddle" />
    Use AI to Generate island-design Pages
</h2>

### Option 1: Install the skill (recommended for AI coding agents)

Using an AI coding agent (Claude Code / Codex / Cursor)? Install the
[island-design-style skill](./skills/island-design-style/README.md):

```bash
skills add snowcattail/island-design
```

### Option 2: One-click prompt (no code, nothing to install)

Non-developer and don't want to write code yourself? Use the
[one-click prompt](./docs/one-click-prompt.md) — no npm, no build step.

**4 steps:**

1. Copy the prompt block from [`docs/one-click-prompt.md`](./docs/one-click-prompt.md).
2. Paste into any AI tool that can fetch URLs (Cursor / Claude / ChatGPT / Gemini / v0 / Bolt) and send.
3. The AI asks what page you want — reply in one phrase (e.g. "personal blog", "product list", "FAQ").
4. Save the `index.html` it returns and double-click to preview.

<h2>
    <img src="./docs/img/icons/download.svg" width="20" height="27" alt="" align="absmiddle" />
    Installation
</h2>

```bash
npm install island-design
```

<h2>
    <img src="./docs/img/icons/rocket.svg" width="20" height="27" alt="" align="absmiddle" />
    Quick Start
</h2>

> ⚠️ **Important**: Please make sure to import the styles with `import 'island-design/style'`, otherwise the components will have no styles or fonts!

```tsx
import { Button, Card } from 'island-design';
import 'island-design/style';

function App() {
    return (
        <div>
            <Button type="primary">Start Adventure</Button>
            <Card color="app-blue">Welcome to the island!</Card>
        </div>
    );
}
```

<h2>
    <img src="./docs/img/icons/copy.svg" width="20" height="27" alt="" align="absmiddle" />
    Documentation
</h2>

Routed by audience and scenario (English primary; Chinese mirrors under [`docs/zh-CN/`](./docs/zh-CN/)):

| Document                                                                | Purpose                                                                                                                                                   |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`docs/design-system/`](./docs/design-system/README.md)                 | Canonical design definition (single source of truth) — tokens, design rules, pixel-exact per-component specs, CSS variable template.                      |
| [`skills/island-design-style/`](./skills/island-design-style/README.md) | Installable Agent skill (`skills add snowcattail/island-design`) — React project usage + standalone-HTML generation, with per-component props references. |
| [`docs/one-click-prompt.md`](./docs/one-click-prompt.md)                | One-click prompt for non-developers — paste one bootstrap prompt, the AI fetches the specs itself and returns a ready `index.html`.                       |
| [`docs/design-prompts.md`](./docs/design-prompts.md)                    | Prompts for design/image tools (v0 / Figma AI / Midjourney / DALL-E), linking to the canonical spec files.                                                |
| [`docs/development/`](./docs/development/README.md)                     | Development guide for this repository — structure, component development, coding standards, testing, build contract.                                      |
| [`docs/adr/`](./docs/adr/README.md)                                     | Architecture decision records.                                                                                                                            |
| [`AGENTS.md`](./AGENTS.md)                                              | Entry point for coding agents working in this repository.                                                                                                 |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md)                                  | Contributing guide.                                                                                                                                       |

<h2>
    <img src="./docs/img/icons/terminal.svg" width="20" height="27" alt="" align="absmiddle" />
    Local Development
</h2>

```bash
# Clone the repository
git clone https://github.com/snowcattail/island-design.git
cd island-design

# Install dependencies
npm install

# Start Demo development server
npm run dev

# Build component library
npm run build

# Build Demo site
npm run build:demo
```

<h2>
    <img src="./docs/img/icons/shield.svg" width="20" height="27" alt="" align="absmiddle" />
    License & Disclaimer
</h2>

- Distributed under the **MIT License** — free to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the Software, including in commercial products (see the [LICENSE](LICENSE) file for the full text). The copyright notice and this permission notice must be included in all copies or substantial portions of the Software.
- The Software is provided "AS IS", without warranty of any kind; the authors are not liable for any claims, damages, or other liability arising from its use. Users are solely responsible for any risks arising from the use of this component library.
- This is an independently created open-source project. It is not an official product of any game company and has no association, authorization, or cooperation with any company or its products.
- All visual assets (icons, illustrations, animations) in this repository are original works created for this project.

<h2>
    <img src="./docs/img/icons/heart.svg" width="20" height="27" alt="" align="absmiddle" />
    Support
</h2>

- The easiest way to support is to give it a star and share it. If you have ideas or suggestions about the project, feel free to open an [Issue](https://github.com/snowcattail/island-design/issues) or submit a PR.
