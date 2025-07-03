import { todoInstance } from '@instances/todo';
import { ResponseType, TodoListType } from './types';

export const todoListsApi = {
	createTodoList(title: string) {
		return todoInstance.post<ResponseType<{ item: TodoListType }>>('todo-lists', { title });
	},
	getTodoLists() {
		return todoInstance.get<TodoListType[]>('todo-lists');
	},
	updateTodoList(todolistId: string, title: string) {
		return todoInstance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
	},
	deleteTodoList(todolistId: string) {
		return todoInstance.delete<ResponseType>(`todo-lists/${todolistId}`);
	},
};
