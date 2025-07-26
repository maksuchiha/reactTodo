import { todoInstance } from '@instances/todo';
import { TaskType, UpdateTaskModel } from './types';
import { BaseResponse } from '@globalTypes/response.types';

type GetTasksResponseType = {
	items: TaskType[];
	totalCount: number;
	error: string | null;
};

export const tasksApi = {
	createTask(todolistId: string, title: string) {
		return todoInstance.post<BaseResponse<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title });
	},
	getTasks(todolistId: string) {
		return todoInstance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
	},
	deleteTask(todolistId: string, taskId: string) {
		return todoInstance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`);
	},
	updateTask(todolistId: string, taskId: string, task: UpdateTaskModel) {
		return todoInstance.put<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`, task);
	},
};
