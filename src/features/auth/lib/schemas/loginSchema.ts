import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().min(3, { message: 'Email is required' }).email({ message: 'Incorrect email address' }),
	password: z.string().min(3, { message: 'Password must be at least 3 characters long' }),
	rememberMe: z.boolean(),
});
