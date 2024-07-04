import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'dist', // 输出目录
        rollupOptions: {
            input: 'js/nomodule.mjs',
            output: {
                format: 'es',
                entryFileNames: 'scrollEventMaster.js'
            },
        },
    },
})