import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import {VitePWA} from 'vite-plugin-pwa';
import path from 'path';



export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(), // Поддержка алиасов из tsconfig
        VitePWA({
            registerType: 'autoUpdate', // PWA настройка
            manifest: {
                name: 'My Vite React App',
                short_name: 'Vite App',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
    server: {
        port: 3000,           // Настройка порта
        open: true,           // Автооткрытие браузера при запуске
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // добавляем алиас для удобства работы с путями
            '@styles': path.resolve(__dirname, './src/styles/'),
            '@components': path.resolve(__dirname, './src/components/'),
            '@pages': path.resolve(__dirname, './src/pages/'),
            '@store': path.resolve(__dirname, './src/store/'),
        },
    },
    build: {
        sourcemap: false,      // Для отладки
        minify: 'esbuild',    // Быстрая минимизация через esbuild
        outDir: 'dist',       // Директория для билда
        target: 'esnext',     // Поддержка последних возможностей JS
    },
});
