import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import dotenv from 'dotenv';
import { configDefaults } from 'vitest/config';

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
	test: {
		environment: 'jsdom',
		setupFiles: './src/setupTests.ts', // путь к файлу для настройки тестов (опционально)
		globals: true, // чтобы не писать import для describe и it в каждом файле
		exclude: [...configDefaults.exclude, 'e2e/*'], // исключить e2e тесты, если есть
	},
	base: '/reactTodo',
	server: {
		port: 3000, // Настройка порта
		open: true, // Автооткрытие браузера при запуске
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), // добавляем алиас для удобства работы с путями
			'@styles': path.resolve(__dirname, './src/styles/'),
			'@features': path.resolve(__dirname, './src/features/'),
			'@components': path.resolve(__dirname, './src/components/'),
			'@pages': path.resolve(__dirname, './src/pages/'),
			'@store': path.resolve(__dirname, './src/store/'),
		},
	},
	build: {
		sourcemap: false, // Для отладки
		minify: 'esbuild', // Быстрая минимизация через esbuild
		outDir: 'dist', // Директория для билда
		target: 'esnext', // Поддержка последних возможностей JS
	},
});
