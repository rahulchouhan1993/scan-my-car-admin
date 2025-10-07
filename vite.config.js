import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx', 
                'resources/js/admin.jsx',
            ],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    resolve: {
        alias: {
            "@":'/resources/js'
        },
    },
    optimizeDeps: {
        include: ["jquery", "select2"],
    },
    define: {
        'process.env': {},
    },
});