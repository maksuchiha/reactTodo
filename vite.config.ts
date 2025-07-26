import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(), // Поддержка алиасов из tsconfig
		// VitePWA({
		//     registerType: 'autoUpdate', // PWA настройка
		//     manifest: {
		//         name: 'My Vite React App',
		//         short_name: 'Vite App',
		//         theme_color: '#ffffff',
		//         icons: [
		//             {
		//                 src: 'icon-192x192.png',
		//                 sizes: '192x192',
		//                 type: 'image/png',
		//             },
		//             {
		//                 src: 'icon-512x512.png',
		//                 sizes: '512x512',
		//                 type: 'image/png',
		//             },
		//         ],
		//     },
		// }),
	],
	base: '/reactTodo',
	server: {
		port: 3000, // Настройка порта
		open: true, // Автооткрытие браузера при запуске
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), // добавляем алиас для удобства работы с путями
			'@assets': path.resolve(__dirname, './src/assets/'),
			'@styles': path.resolve(__dirname, './src/styles/'),
			'@features': path.resolve(__dirname, './src/features/'),
			'@components': path.resolve(__dirname, './src/components/'),
			'@pages': path.resolve(__dirname, './src/pages/'),
			'@store': path.resolve(__dirname, './src/store/'),
			'@instances': path.resolve(__dirname, './src/utils/axios/instances'),
			'@globalTypes': path.resolve(__dirname, './src/types'),
			'@utils': path.resolve(__dirname, './src/utils'),
		},
	},
	build: {
		sourcemap: false, // Для отладки
		minify: 'esbuild', // Быстрая минимизация через esbuild
		outDir: 'dist', // Директория для билда
		target: 'esnext', // Поддержка последних возможностей JS
	},
});
