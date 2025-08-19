import { todoInstance } from '@instances/todo';
import { BaseResponse } from '@globalTypes/response.types';

// export const authApi = {
// 	me() {
// 		return todoInstance.get<BaseResponse<{ id: number; email: string; login: string }>>('auth/me');
// 	},
// 	login(payload: LoginInputs) {
// 		return todoInstance.post<BaseResponse<{ userId: number; token: string }>>('auth/login', payload);
// 	},
// 	logOut() {
// 		return todoInstance.delete<BaseResponse>('auth/login');
// 	},
// };

export const authApi = todoInstance.injectEndpoints({
	// `endpoints` - метод, возвращающий объект с эндпоинтами для `API`, описанными
	// с помощью функций, которые будут вызываться при вызове соответствующих методов `API`
	// (например `get`, `post`, `put`, `patch`, `delete`)
	endpoints: (build) => ({
		me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
			query: () => 'auth/me',
		}),
		login: build.mutation<
			BaseResponse<{ userId: number; token: string }>,
			{ email: string; password: string; rememberMe: boolean; captcha?: string | undefined }
		>({
			query: (payload) => ({
				url: 'auth/login',
				method: 'POST',
				body: payload,
			}),
		}),
		logOut: build.mutation<BaseResponse, void>({
			query: () => ({
				url: 'auth/login',
				method: 'DELETE',
			}),
		}),
	}),
});

export const { useMeQuery, useLoginMutation, useLogOutMutation } = authApi;
