import { defineConfig } from 'vite';
import pluginReact from '@vitejs/plugin-react';
import pluginTsConfig from 'vite-tsconfig-paths';
import pluginChecker from 'vite-plugin-checker';
import pluginMacros from 'vite-plugin-babel-macros';
import pluginSvg from 'vite-plugin-svgr';

import { setDefaultResultOrder } from 'dns';

setDefaultResultOrder('verbatim');

export default defineConfig({
    plugins: [
        pluginReact({
            jsxRuntime: 'automatic',
            babel: {
                plugins: ['babel-plugin-macros']
            }
        }),
        pluginTsConfig(),
        pluginMacros(),
        pluginSvg(),
        pluginChecker({
            typescript: true,
            eslint: {
                lintCommand: 'lint:eslint'
            }
        })
    ],
    build: {
        target: 'es2020'
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2020'
        }
    },
    server: {
        host: true
    }
});
