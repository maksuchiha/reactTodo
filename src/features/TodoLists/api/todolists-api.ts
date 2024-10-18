import { instance } from './instance';
import { ResponseType, TodoListType } from './types';

export const todoListsApi = {
	createTodoList(title: string) {
		return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', { title });
	},
	getTodoLists() {
		return instance.get<TodoListType[]>('todo-lists');
	},
	updateTodoList(todolistId: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
	},
	deleteTodoList(todolistId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
	},
};
