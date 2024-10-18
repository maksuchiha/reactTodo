import { instance } from './instance';
import { ResponseType, TaskType } from './types';
import { TasksStateType } from '@store/tasks-reducer';

export const tasksApi = {
	createTask(todolistId: string, title: string) {
		return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title });
	},
	getTasks(todolistId: string) {
		return instance.get<TasksStateType>(`todo-lists/${todolistId}/tasks`);
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
	},
	updateTask(todolistId: string, taskId: string, task: TaskType) {
		return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, task);
	},
};
