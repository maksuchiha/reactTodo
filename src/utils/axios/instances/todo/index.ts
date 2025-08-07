import axios from 'axios';
import { AUTH_TOKEN } from '../../../../constants';

export const todoInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
	headers: {
		// Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
		'API-KEY': import.meta.env.VITE_API_KEY,
	},
});

todoInstance.interceptors.request.use(function (config) {
	config.headers['Authorization'] = `Bearer ${localStorage.getItem(AUTH_TOKEN)}`;
	return config;
});
