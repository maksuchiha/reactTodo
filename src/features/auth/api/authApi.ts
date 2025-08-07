import { todoInstance } from '@instances/todo';
import { BaseResponse } from '@globalTypes/response.types';
import { LoginInputs } from '@features/auth/lib/schemas/loginSchema';

export const authApi = {
	me() {
		return todoInstance.get<BaseResponse<{ id: number; email: string; login: string }>>('auth/me');
	},
	login(payload: LoginInputs) {
		return todoInstance.post<BaseResponse<{ userId: number; token: string }>>('auth/login', payload);
	},
	logOut() {
		return todoInstance.delete<BaseResponse>('auth/login');
	},
};
