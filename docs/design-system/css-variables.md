# CSS Variables

When re-implementing the style without depending on the component library, declare the following variables on `:root`:

```css
:root {
    /* Fonts */
    --island-font: Nunito, 'Noto Sans SC', -apple-system, 'PingFang SC', 'Hiragino Sans GB', sans-serif;

    /* Primary color */
    --island-primary: #19c8b9;
    --island-primary-hover: #3dd4c6;
    --island-primary-active: #11a89b;
    --island-primary-bg: #e6f9f6;

    /* Text */
    --island-text: #794f27;
    --island-text-body: #725d42;
    --island-text-secondary: #9f927d;
    --island-text-muted: #8a7b66;
    --island-text-disabled: #c4b89e;

    /* Backgrounds */
    --island-bg: #f8f8f0;
    --island-bg-content: rgb(247, 243, 223);
    --island-bg-disabled: #f0ece2;

    /* Borders */
    --island-border: #c4b89e;
    --island-border-hover: #a89878;

    /* Radius */
    --island-radius-sm: 12px;
    --island-radius: 18px;
    --island-radius-lg: 24px;
    --island-radius-pill: 50px;

    /* 3D shadows */
    --island-shadow-btn: #bdaea0;
    --island-shadow-input: #d4c9b4;
    --island-shadow-switch: #5a9e1e;

    /* Game-specific colors */
    --island-focus-yellow: #ffcc00;
    --island-focus-yellow-d: #e0b800;
    --island-sidebar-active: #b7c6e5;
    --island-sidebar-hover: #d6dff0;

    /* Status */
    --island-success: #6fba2c;
    --island-warning: #f5c31c;
    --island-error: #e05a5a;

    /* Motion */
    --island-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --island-duration-fast: 0.15s;
    --island-duration: 0.25s;
    --island-duration-slow: 0.35s;
}
```

The library itself also ships a set of runtime CSS custom properties: the packaged stylesheet declares `--island-*` properties on `:root`, mapped from the Less compile-time tokens, and component styles reference them through `var(--island-*)`. Consumers who install the library can override those properties for theming. The template above is for standalone re-implementation, so its variable names are the short-hand set rather than the full runtime property set.
