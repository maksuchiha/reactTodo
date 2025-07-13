import { z } from 'zod';
import { TaskStatus, TaskPriority } from './enums';

export const DomainTaskSchema = z.object({
	description: z.string().nullable(),
	title: z.string(),
	status: z.nativeEnum(TaskStatus),
	priority: z.nativeEnum(TaskPriority),
	startDate: z.string().nullable(),
	deadline: z.string().nullable(),
	id: z.string(),
	todoListId: z.string(),
	order: z.number(),
	addedDate: z.string(),
});

export const UpdateTaskModelSchema = DomainTaskSchema.pick({
	title: true,
	description: true,
	status: true,
	priority: true,
	startDate: true,
	deadline: true,
});

export type UpdateTaskModel = z.infer<typeof UpdateTaskModelSchema>;

export type TaskType = z.infer<typeof DomainTaskSchema>;
