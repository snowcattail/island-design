import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const require = createRequire(import.meta.url);
const { build } = createRequire(require.resolve('vite'))('esbuild');
const root = fileURLToPath(new URL('..', import.meta.url));
const packageDir = join(root, 'packages/components');
const manifest = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8'));
const esmEntry = resolve(packageDir, manifest.exports['.'].import);
const componentDir = join(dirname(esmEntry), 'components');

if (!existsSync(esmEntry) || !existsSync(componentDir)) {
    throw new Error(`找不到 ${manifest.name} 的 ESM 构建产物，请先运行 npm run build。`);
}

const available = new Set(
    readdirSync(componentDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
);
const samples = ['Button', 'Input', 'Switch', 'Checkbox', 'Tag'].filter((name) => available.has(name)).slice(0, 3);

if (samples.length < 2) {
    throw new Error('ESM 产物中可用于测量的基础组件少于两个，请检查构建产物。');
}

async function measure(importStatement, componentExpression) {
    const { outputFiles, metafile } = await build({
        absWorkingDir: root,
        stdin: {
            contents: `
                import { createElement } from 'react';
                import { createRoot } from 'react-dom/client';
                ${importStatement}
                const container = document.getElementById('root');
                const Component = ${componentExpression};
                createRoot(container).render(createElement(Component, { 'aria-label': 'Bundle benchmark' }));
            `,
            resolveDir: root,
            sourcefile: 'bundle-benchmark.mjs',
        },
        bundle: true,
        format: 'esm',
        platform: 'browser',
        target: 'es2020',
        define: { 'process.env.NODE_ENV': '"production"' },
        external: ['react', 'react-dom'],
        alias: { [manifest.name]: esmEntry },
        treeShaking: true,
        minify: true,
        metafile: true,
        write: false,
    });

    const [{ contents }] = outputFiles;
    const [output] = Object.values(metafile.outputs);
    const components = new Set();
    for (const [input, { bytesInOutput }] of Object.entries(output.inputs)) {
        const [component] = relative(componentDir, resolve(root, input)).split(sep);
        if (bytesInOutput > 0 && available.has(component)) components.add(component);
    }

    return { raw: contents.byteLength, gzip: gzipSync(contents, { level: 9 }).byteLength, components };
}

// The runtime lookup keeps the entire namespace reachable from the mounted app.
const full = await measure(
    `import * as library from '${manifest.name}';`,
    `library[container.dataset.component ?? ${JSON.stringify(samples[0])}]`
);
const singles = await Promise.all(
    samples.map(async (name) => ({ name, ...(await measure(`import { ${name} } from '${manifest.name}';`, name)) }))
);

const kb = (bytes) => (bytes / 1000).toFixed(2);
const row = (label, { raw, gzip, components }) => {
    const reduction = ((1 - gzip / full.gzip) * 100).toFixed(2);
    return `| ${label} | ${kb(raw)} | ${kb(gzip)} | ${reduction}% | ${components.size} |`;
};

console.log('生产环境压缩后的 JS（1 KB = 1000 B，gzip level 9；React、React DOM、CSS 和独立资源不计入）。\n');
console.log('| 场景 | Raw (KB) | Gzipped (KB) | 较全量减少（Gzipped） | 入包组件目录数 |');
console.log('| --- | ---: | ---: | ---: | ---: |');
console.log(row('A · 全量引入', full));
for (const single of singles) console.log(row(`B · ${single.name}`, single));

for (const { name, components, gzip } of singles) {
    if (
        !full.components.has(name) ||
        !components.has(name) ||
        components.size >= full.components.size ||
        gzip >= full.gzip
    ) {
        throw new Error(`Tree-Shaking 验证失败：${name} 未保留，或单组件包没有减少组件模块及 Gzipped 体积。`);
    }
}
