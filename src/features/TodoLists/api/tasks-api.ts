import { todoInstance } from '@instances/todo';
import { ResponseType, TaskType } from './types';
import { TasksStateType } from '@store/tasks-slice';

export const tasksApi = {
	createTask(todolistId: string, title: string) {
		return todoInstance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title });
	},
	getTasks(todolistId: string) {
		return todoInstance.get<TasksStateType>(`todo-lists/${todolistId}/tasks`);
	},
	deleteTask(todolistId: string, taskId: string) {
		return todoInstance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
	},
	updateTask(todolistId: string, taskId: string, task: TaskType) {
		return todoInstance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, task);
	},
};
