import { z } from 'zod';

export type BaseResponse<T> = {
	resultCode: number;
	messages: string[];
	data: T;
};

export type LoginInputs = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
	email: z.string().email({ message: 'Incorrect email address' }),
	password: z
		.string()
		.min(1, { message: 'Password is required' })
		.min(3, { message: 'Password must be at least 3 characters long' }),
	rememberMe: z.boolean().optional(),
	captcha: z.string().optional(),
});
