import { todoInstance } from '@instances/todo';
import { ResponseType, TodoListType } from './types';

export const todoListsApi = {
	createTodoList(title: string) {
		return todoInstance.post<ResponseType<{ item: TodoListType }>>('todo-lists', { title });
	},
	getTodoLists() {
		return todoInstance.get<TodoListType[]>('todo-lists');
	},
	updateTodoList(payload: { todolistId: string; newTitle: string }) {
		return todoInstance.put<ResponseType>(`todo-lists/${payload.todolistId}`, { title: payload.newTitle });
	},
	deleteTodoList(todolistId: string) {
		return todoInstance.delete<ResponseType>(`todo-lists/${todolistId}`);
	},
};
