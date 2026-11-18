# Island Design

<div align="center">
    <img src="img/logo.png" alt="island-design" style="border-radius: 24px; width: 220px; display: block; margin: 0 auto;" />
</div>
<p align="center">
    <a href="../LICENSE"><img src="https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square" alt="License: MIT"></a>
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
    <a href="../README.md">English</a> | 简体中文 | <a href="./README.ja.md">日本語</a>
</p>

<h2>
    <img src="img/icons/bell.svg" width="20" height="27" alt="" align="absmiddle" />
    介绍
</h2>

一款轻量的治愈系 React + TypeScript UI 组件库，采用原创的海岛风格设计语言，所有视觉元素、布局、图标、动画均为独立设计实现。

<h2>
    <img src="img/icons/monitor.svg" width="20" height="27" alt="" align="absmiddle" />
    预览
</h2>

- 在线预览：[island-design](https://snowcattail.github.io/island-design/#/)

<h2>
    <img src="img/icons/git-branch.svg" width="20" height="27" alt="" align="absmiddle" />
    相关
</h2>

- 图标（**naive-icons**）：<https://github.com/snowcattail/naive-icons>
- Vue 版本（**animal-island-vue**）：<https://github.com/snowcattail/animal-island-vue>
- 微信小程序版本（**animal-island-wx**）：<https://github.com/lns567/animal-island-wx>

<h2>
    <img src="img/icons/sparkles.svg" width="20" height="27" alt="" align="absmiddle" />
    用 AI 工具生成 island-design 风格页面
</h2>

### 方式一：安装 skill（AI 编程 Agent 推荐）

在用 AI 编程 Agent（Claude Code / Codex / Cursor）？直接安装
[island-design-style skill](../skills/island-design-style/README.md)：

```bash
skills add snowcattail/island-design
```

### 方式二：一键提示词（无需安装代码）

非研发人员，不想自己写代码？用
[一键提示词](./one-click-prompt.md)即可，不需要 npm，不需要打包工具。

**4 步使用：**

1. 复制 [`docs/one-click-prompt.md`](./one-click-prompt.md) 中的提示词代码块。
2. 粘贴到任意可访问 URL 的 AI 工具（Cursor / Claude / ChatGPT / Gemini / v0 / Bolt）发送。
3. AI 会反问做什么页面，用一句话回答即可（如「个人博客」「商品列表」「FAQ」）。
4. 保存 AI 输出的 `index.html`，双击即可预览。

<h2>
    <img src="img/icons/download.svg" width="20" height="27" alt="" align="absmiddle" />
    安装
</h2>

```bash
npm install island-design
```

<h2>
    <img src="img/icons/rocket.svg" width="20" height="27" alt="" align="absmiddle" />
    快速上手
</h2>

> ⚠️ **重要**: 请务必导入样式文件 `import 'island-design/style'`，否则组件将没有样式与字体!

```tsx
import { Button, Card } from 'island-design';
import 'island-design/style';

function App() {
    return (
        <div>
            <Button type="primary">开始冒险</Button>
            <Card color="app-blue">欢迎来到小岛！</Card>
        </div>
    );
}
```

<h2>
    <img src="img/icons/copy.svg" width="20" height="27" alt="" align="absmiddle" />
    文档
</h2>

按读者与场景路由（英文为主文档，中文镜像在 [`docs/zh-CN/`](./zh-CN/)）：

| 文档                                                                     | 用途                                                                                                                      |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| [`docs/design-system/`](./zh-CN/design-system/README.md)                 | 设计系统严格定义 (single source of truth) —— 设计 token、设计规则、逐组件像素级规范、CSS 变量模板。                       |
| [`skills/island-design-style/`](../skills/island-design-style/README.md) | 可安装的 Agent skill（`skills add snowcattail/island-design`）—— React 项目使用 + 单文件 HTML 生成，含分组件 props 参考。 |
| [`docs/one-click-prompt.md`](./zh-CN/one-click-prompt.md)                | 给普通用户的一键提示词 —— 粘贴一段引导提示词，AI 自行抓取规范文件并产出可直接双击预览的 `index.html`。                    |
| [`docs/design-prompts.md`](./zh-CN/design-prompts.md)                    | 设计 / 出图工具提示词（v0 / Figma AI / Midjourney / DALL-E），指向规范文件链接。                                          |
| [`docs/development/`](./zh-CN/development/README.md)                     | 本仓库开发文档 —— 目录结构、组件开发、代码规范、测试、构建契约。                                                          |
| [`docs/adr/`](./zh-CN/adr/README.md)                                     | 架构决策记录 (ADR)。                                                                                                      |
| [`AGENTS.md`](../AGENTS.md)                                              | 在本仓库内工作的 coding agent 入口。                                                                                      |
| [`CONTRIBUTING.md`](../CONTRIBUTING.md)                                  | 贡献指南。                                                                                                                |

<h2>
    <img src="img/icons/terminal.svg" width="20" height="27" alt="" align="absmiddle" />
    本地开发
</h2>

```bash
# 克隆仓库
git clone https://github.com/snowcattail/island-design.git
cd island-design

# 安装依赖
npm install

# 启动 Demo 开发服务器
npm run dev

# 构建组件库
npm run build

# 构建 Demo 站点
npm run build:demo
```

<h2>
    <img src="img/icons/shield.svg" width="20" height="27" alt="" align="absmiddle" />
    许可与免责声明
</h2>

- 本项目基于 **MIT 协议**发布 —— 可自由使用、复制、修改、合并、发布、分发、再许可及出售本软件副本，包括商业用途（完整文本见 [LICENSE](../LICENSE) 文件）。须在所有副本或实质部分中保留上述版权声明与本许可声明。
- 本软件按「原样」提供，不附带任何担保；作者不对其使用产生的任何索赔、损失或其他责任负责，使用本组件库产生的任何风险由使用者自行承担。
- 本项目为独立创作的开源项目，并非任何游戏公司的官方产品，与任何公司及其产品无关联、授权或合作关系。
- 本仓库内所有视觉素材（图标、插画、动画）均为本项目原创作品。

<h2>
    <img src="img/icons/heart.svg" width="20" height="27" alt="" align="absmiddle" />
    支持
</h2>

- 最直接的支持就是点个赞、转发分享；如果对项目有想法或建议，欢迎提交 [Issue](https://github.com/snowcattail/island-design/issues) 或 PR。
