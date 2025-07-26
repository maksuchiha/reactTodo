import { todoInstance } from '@instances/todo';
import { TodoListType } from './types';
import { BaseResponse } from '@globalTypes/response.types';

export const todoListsApi = {
	createTodoList(title: string) {
		return todoInstance.post<BaseResponse<{ item: TodoListType }>>('todo-lists', { title });
	},
	getTodoLists() {
		return todoInstance.get<TodoListType[]>('todo-lists');
	},
	updateTodoList(payload: { todolistId: string; newTitle: string }) {
		return todoInstance.put<BaseResponse>(`todo-lists/${payload.todolistId}`, { title: payload.newTitle });
	},
	deleteTodoList(todolistId: string) {
		return todoInstance.delete<BaseResponse>(`todo-lists/${todolistId}`);
	},
};
