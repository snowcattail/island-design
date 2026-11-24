# Build and Release

`npm run build` builds the workspace packages and produces the published artifact in `packages/components/dist/`.
The component workspace runs `vite build` for JavaScript, CSS, and assets, then
`tsc --project tsconfig.build.json --emitDeclarationOnly` for declarations in `packages/components/dist/types/`. The rationale behind
the choices below is recorded in [../adr/](../adr/); this page is the contract itself.

## Build Contract

`packages/components/vite.config.ts` registers four plugins on top of `@vitejs/plugin-react` to make per-component imports work. Changing
build logic without preserving the following breaks consumer tree-shaking:

- **Dual output** — ES into `dist/es/` and CJS into `dist/cjs/`, both with `preserveModules: true` and
  `preserveModulesRoot: 'src'`. The ES output lets consumers tree-shake unused component JavaScript and its inlined assets.
  Do not turn `preserveModules` off.
- **Externals** — the library build keeps `react`, `react-dom`, `classnames`, `dayjs`, and `naive-icons`
  external, including their subpaths. `react` and `react-dom` are peer dependencies.
- **Workspace source** — Vite builds the hooks from their own entry into both JavaScript formats, and TypeScript emits
  their declarations under `dist/types/hooks/src/`. Less compiles the token source into the shared stylesheet.
- **`cssCodeSplit: true`, one stylesheet** — component CSS is split per module and aggregated by
  `emitGlobalStyleEntryPlugin` into `dist/index.css`, but the component JavaScript carries **no CSS import**. A
  published `import "./x.css"` is a file-style import: Node refuses to parse it, so the package fails to load in
  plain Node (`ERR_UNKNOWN_FILE_EXTENSION`) and in any SSR bundler that follows the import graph. Styles are
  delivered through the single `@snowcattail/island-design/style` entry instead. Do not turn `cssCodeSplit` off, and do not
  reintroduce per-component CSS imports.
- **Assets stay external** — `@laynezh/vite-plugin-lib-assets` (`outputPath: 'files'`, `limit: 0`) writes fonts and
  images to `dist/files/` instead of letting library mode inline them.
- **Global stylesheet entry** — `emitGlobalStyleEntryPlugin` aggregates every css chunk under `dist/es/` (module and
  plain, e.g. `Cursor/cursor.css`) into `dist/index.css` (what `@snowcattail/island-design/style` resolves to), then deletes the
  consumed chunks — no JavaScript references them anymore, keeping them in the package would be dead weight. It also
  prunes orphaned files from `dist/files/`. After changing a component's CSS, confirm those styles still appear in
  `dist/index.css`.
- **Illustrations are strings, not modules** — the scene SVGs are referenced with
  `new URL('./x.svg', import.meta.url).href`, never with `import`. An `import` would emit
  `import x from "../../files/x.svg"` into the published JavaScript, which Node cannot resolve either. Vite's
  library mode inlines such assets as data URIs (`shouldInline` returns `true` for `build.lib`), which is the only
  form that survives the consumer's bundler. The four illustrations (~315 KB of SVG) therefore live inside the
  JavaScript, roughly 20% larger as percent-encoded data URIs.
- **No file-style imports in the output** — `npm run check:bundle` scans `dist/es` and `dist/cjs` for `import` /
  `require` of `.css`, `.less`, `.svg`, `.png` and friends, and fails the build on any hit. The published JavaScript
  must stay loadable by plain Node and by SSR bundlers.
- **ESM-compatible declarations** — `scripts/fix-dts-extensions.mjs` rewrites the relative specifiers in
  `dist/types/` to their ESM form (`./Button` → `./Button.js`, `./components/Button` →
  `./components/Button/index.js`) and drops the style side-effect imports. The package is ESM
  (`"type": "module"`), so a consumer on `moduleResolution: "node16"` / `"nodenext"` cannot resolve the
  extensionless, directory-style specifiers `tsc` copies verbatim from the source — the whole module graph
  fails to resolve and **every export degrades to `any`**, silently disabling the consumer's type checking
  (issue #79). `npm run check:types` fails the build if any relative specifier in `dist/types/` still lacks an
  explicit extension or points at a missing `.d.ts`. This is the same discipline as `rewriteCssAssetUrls` above:
  the published artifact is normalised to the package's own export contract, not the other way round.
- **woff2 only** — `stripWoffFallbackPlugin` removes the woff fallbacks emitted alongside the woff2 fonts, cutting
  roughly 40% of font weight.
- `pruneEmptyDirsPlugin('dist')` cleans up directories left empty by the steps above.

## Package Contract

`packages/components/package.json` is wired for per-component consumption; keep it that way:

- `exports` maps `.` to the ES/CJS/types triple, `./style` to `dist/index.css`, and `./es/*` to the preserved ES
  modules with a `types` condition pointing at `dist/types/*`, so a deep import keeps its types under every
  `moduleResolution`.
- `sideEffects: ["**/*.css", "**/*.less"]` preserves stylesheet imports while letting bundlers drop unused JavaScript modules.
- `files` limits the published tarball to the build output plus the README.
- `dependencies` contains `classnames`, `naive-icons` (the icon set), and `dayjs` (the date layer, per
  [ADR 0005](../adr/0005-dayjs-as-the-date-layer.md)). The hooks and tokens ship inside the component package.
  The published JavaScript keeps package imports for these three external runtime dependencies. The consumer's bundler
  resolves imports reachable from the components in use. Do not add further runtime dependencies.

`prepublishOnly` in `packages/components/package.json` runs the root workspace build and the declaration check, so a publish always ships a fresh artifact and never
ships declarations the ESM module graph cannot resolve.

## Badges

`npm run badges` (`scripts/generate-coverage-badges.mjs`) reads `coverage/coverage-summary.json` and
`coverage/vitest-results.json`, writes `coverage/badges/coverage.json`, counts components by scanning
`packages/components/src/components/` for directories containing a matching `<Name>.tsx`, and rewrites the hardcoded `tests-NN` and
`components-NN` shields in both `README.md` and `docs/README.zh-CN.md`. Run `npm run test:cov` first — the script exits
with an error if the coverage summary is missing.

## Demo Site

`npm run dev` starts the private `apps/demo` workspace. `npm run build:demo` builds the demo from the local component
source into `apps/demo/demo-dist/`, and `npm run check:types --workspace=@island-design/demo` checks its types. The demo
is excluded from the npm artifact.

For Vercel, import the repository with its root directory as the project root. `vercel.json` configures the build, static
output, and SPA fallback. For GitHub Pages, select **GitHub Actions** under **Settings → Pages → Build and deployment → Source**.
`deploy-docs.yml` builds and deploys on pushes to `main` and passes the site's base path to Vite. Use hash links such as
`/#/button` on Vercel or `/island-design/#/button` on the default GitHub project site. `npm run deploy` builds for the
legacy branch-based Pages deployment at `/island-design/`.

## Workspace packages

The private root package coordinates npm workspaces under `packages/*` and `apps/*`. The same package set is listed in
`pnpm-workspace.yaml`. `@snowcattail/island-design` is the component package, and `apps/demo` is the private demo.
`@island-design/tokens` owns the Less variables and default CSS theme, and `@island-design/hooks` owns the typed React
hooks. The root build also produces standalone workspace artifacts for tokens and hooks.
