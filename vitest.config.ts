import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@instances': path.resolve(__dirname, './src/utils/axios/instances'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
	},
});
