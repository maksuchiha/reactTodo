import { z } from 'zod';

export const TodolistSchema = z.object({
	id: z.string(),
	title: z.string(),
	order: z.number(),
	addedDate: z.coerce.date(),
});

export type TodoListType = z.infer<typeof TodolistSchema>;
