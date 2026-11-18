# CSS Variables

不依赖组件库自实现样式时，在 `:root` 中声明以下变量：

```css
:root {
    /* 字体 */
    --island-font: Nunito, 'Noto Sans SC', -apple-system, 'PingFang SC', 'Hiragino Sans GB', sans-serif;

    /* 主色 */
    --island-primary: #19c8b9;
    --island-primary-hover: #3dd4c6;
    --island-primary-active: #11a89b;
    --island-primary-bg: #e6f9f6;

    /* 文字 */
    --island-text: #794f27;
    --island-text-body: #725d42;
    --island-text-secondary: #9f927d;
    --island-text-muted: #8a7b66;
    --island-text-disabled: #c4b89e;

    /* 背景 */
    --island-bg: #f8f8f0;
    --island-bg-content: rgb(247, 243, 223);
    --island-bg-disabled: #f0ece2;

    /* 边框 */
    --island-border: #c4b89e;
    --island-border-hover: #a89878;

    /* 圆角 */
    --island-radius-sm: 12px;
    --island-radius: 18px;
    --island-radius-lg: 24px;
    --island-radius-pill: 50px;

    /* 3D 阴影 */
    --island-shadow-btn: #bdaea0;
    --island-shadow-input: #d4c9b4;
    --island-shadow-switch: #5a9e1e;

    /* 游戏特殊色 */
    --island-focus-yellow: #ffcc00;
    --island-focus-yellow-d: #e0b800;
    --island-sidebar-active: #b7c6e5;
    --island-sidebar-hover: #d6dff0;

    /* 状态 */
    --island-success: #6fba2c;
    --island-warning: #f5c31c;
    --island-error: #e05a5a;

    /* 动效 */
    --island-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --island-duration-fast: 0.15s;
    --island-duration: 0.25s;
    --island-duration-slow: 0.35s;
}
```

组件库本身也提供一套运行时 CSS 自定义属性：打包后的样式表在 `:root` 上声明 `--island-*` 属性，由 Less 编译期 token 映射而来，组件样式通过 `var(--island-*)` 引用。安装组件库的消费者可覆盖这些属性做主题定制。上面的模板用于脱离组件库自实现，因此变量名是精简版命名，而非完整的运行时属性集。
