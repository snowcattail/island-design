import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, '../../packages/components/src'),
        },
    },
    css: {
        modules: {
            generateScopedName: 'island-[local]-[hash:base64:5]',
            localsConvention: 'camelCase',
        },
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                additionalData: `@import "${resolve(__dirname, '../../packages/tokens/src/variables.less')}";`,
            },
        },
    },
    build: {
        outDir: 'demo-dist',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                },
            },
        },
        assetsInlineLimit: 4096,
    },
});
