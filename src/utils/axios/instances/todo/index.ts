import { AUTH_TOKEN } from '@utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { handleError } from '@utils/serverResponse/handleError';

export const todoInstance = createApi({
	// `reducerPath` - имя `slice`, куда будут сохранены состояние и экшены для этого `API`
	reducerPath: 'todoListsApi',
	tagTypes: ['TodoList', 'Task'],
	// `baseQuery` - конфигурация для `HTTP-клиента`, который будет использоваться для отправки запросов
	baseQuery: async (args, api, extraOptions) => {
		const result = await fetchBaseQuery({
			baseUrl: import.meta.env.VITE_BASE_URL,
			prepareHeaders: (headers) => {
				headers.set('API-KEY', import.meta.env.VITE_API_KEY);
				headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`);
			},
		})(args, api, extraOptions);

		handleError(api, result);

		return result;
	},
	// Глобальные настройки кеша/рефетча (можно переопределять на уровне эндпоинтов)
	keepUnusedDataFor: 60,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	endpoints: () => ({}),
});
