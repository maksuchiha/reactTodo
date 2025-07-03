import { todoInstance } from '@instances/todo';
import { BaseResponse, LoginInputs } from './authApi.types';

export const authApi = {
	login(payload: LoginInputs) {
		return todoInstance.post<BaseResponse<{ userId: number }>>('auth/login', payload);
	},
};
