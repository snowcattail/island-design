# island-design

React component library with ESM, CJS, TypeScript declarations, and a separate stylesheet entry.

## Installation

```bash
npm install @snowcattail/island-design react react-dom
```

## Usage

Import individual components and the shared stylesheet:

```tsx
import { Button } from '@snowcattail/island-design';
import '@snowcattail/island-design/style.css';

export function App() {
    return <Button>Explore</Button>;
}
```

Alternatively, import the library namespace:

```tsx
import * as Island from '@snowcattail/island-design';
import '@snowcattail/island-design/style.css';

export function App() {
    return <Island.Button>Explore</Island.Button>;
}
```

See the [online documentation](https://snowcattail.github.io/island-design/) and [repository](https://github.com/snowcattail/island-design).
