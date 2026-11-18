#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync, appendFileSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const args = process.argv.slice(2).filter((arg) => arg !== '--');
const dryRun = args.includes('--dry-run');
const names = args.filter((arg) => arg !== '--dry-run');

if (names.length !== 1 || !/^[A-Z][A-Za-z0-9]*$/.test(names[0])) {
    console.error('Usage: npm run gen <PascalCaseComponentName> -- [--dry-run]');
    process.exitCode = 1;
} else {
    const name = names[0];
    const dir = resolve(root, 'src/components', name);
    const rootIndex = resolve(root, 'src/index.ts');
    const kebab = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    if (existsSync(dir) || readFileSync(rootIndex, 'utf8').includes(`./components/${name}`)) {
        console.error(`Component ${name} already exists.`);
        process.exitCode = 1;
    } else {
        const files = {
            [`${name}.tsx`]: `import React from 'react';
import styles from './${kebab}.module.less';

export interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {
    /** 内容 */
    children?: React.ReactNode;
}

export const ${name}: React.FC<${name}Props> = ({ children, className, ...rest }) => (
    <div className={[styles.${kebab.replaceAll('-', '')}, className].filter(Boolean).join(' ')} {...rest}>
        {children}
    </div>
);

${name}.displayName = '${name}';
`,
            [`${kebab}.module.less`]: `.${kebab.replaceAll('-', '')} {
    color: var(--animal-text-color);
    border-radius: var(--animal-border-radius-base);
}
`,
            'index.ts': `export { ${name} } from './${name}';
export type { ${name}Props } from './${name}';
`,
            [`${name}.test.tsx`]: `import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { ${name} } from './${name}';

describe('${name}', () => {
    it('renders its content', () => {
        render(<${name}>Example</${name}>);
        expect(screen.getByText('Example')).toBeInTheDocument();
    });

    it('has no axe-core accessibility violations', async () => {
        const { container } = render(<${name}>Example</${name}>);
        const result = await axe.run(container, {
            rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
        });
        expect(result.violations).toEqual([]);
    });
});
`,
        };
        const planned = [...Object.keys(files).map((file) => join(dir, file)), rootIndex];
        console.log(`${dryRun ? 'Would create' : 'Creating'} ${name}:`);
        for (const file of planned) console.log(`  ${file}`);
        if (!dryRun) {
            mkdirSync(dir, { recursive: true });
            for (const [file, content] of Object.entries(files))
                writeFileSync(join(dir, file), content, { flag: 'wx' });
            appendFileSync(
                rootIndex,
                `\nexport { ${name} } from './components/${name}';\nexport type { ${name}Props } from './components/${name}';\n`
            );
            console.log('Add the component to the demo and design-system/skill documentation before running CI.');
        }
    }
}
