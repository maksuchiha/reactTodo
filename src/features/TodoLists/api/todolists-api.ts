import { TodoListType } from '@features/TodoLists/api/types';
import { BaseResponse } from '@globalTypes/response.types';
import { todoInstance } from '@instances/todo';
import { RequestStatus } from '@store/app-slice';

export type TodoFilterType = 'all' | 'completed' | 'progress';
export type TodolistStateType = TodoListType & {
	filter: TodoFilterType;
	entityStatus: RequestStatus;
};

// `createApi` - функция из `RTK Query`, позволяющая создать объект `API`
// для взаимодействия с внешними `API` и управления состоянием приложения
export const todoListsApi = todoInstance.injectEndpoints({
	// `endpoints` - метод, возвращающий объект с эндпоинтами для `API`, описанными
	// с помощью функций, которые будут вызываться при вызове соответствующих методов `API`
	// (например `get`, `post`, `put`, `patch`, `delete`)
	endpoints: (build) => ({
		getTodoLists: build.query<TodolistStateType[], void>({
			query: () => 'todo-lists',
			transformResponse: (todoLists: TodoListType[]): TodolistStateType[] =>
				todoLists.map((todolist) => ({ ...todolist, filter: 'all', entityStatus: 'idle' })),
			providesTags: (result) =>
				result
					? [{ type: 'TodoList' as const, id: 'LIST' }, ...result.map((l) => ({ type: 'TodoList' as const, id: l.id }))]
					: [{ type: 'TodoList' as const, id: 'LIST' }],
		}),
		createTodoList: build.mutation<BaseResponse<{ item: TodoListType }>, string>({
			query: (title) => ({
				url: 'todo-lists',
				method: 'POST',
				body: { title },
			}),
			invalidatesTags: ['TodoList'],
		}),
		updateTodoListTitle: build.mutation<BaseResponse, { id: string; title: string }>({
			query: ({ id, title }) => ({
				url: `todo-lists/${id}`,
				method: 'PUT',
				body: { title },
			}),
			invalidatesTags: ['TodoList'],
		}),
		// инвалидируем только теги "TodoList"
		deleteTodoList: build.mutation<BaseResponse, string>({
			query: (id) => ({
				url: `todo-lists/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (_res, _err, id) => [
				{ type: 'TodoList', id },
				{ type: 'TodoList', id: 'LIST' },
			],
		}),
	}),
	overrideExisting: false,
});

// `createApi` создает объект `API`, который содержит все эндпоинты в виде хуков,
// определенные в свойстве `endpoints`
export const {
	useGetTodoListsQuery,
	useCreateTodoListMutation,
	useDeleteTodoListMutation,
	useUpdateTodoListTitleMutation,
} = todoListsApi;
