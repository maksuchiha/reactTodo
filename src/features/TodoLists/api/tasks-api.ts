import { todoInstance } from '@instances/todo';
import { TaskType, UpdateTaskModel } from './types';
import { BaseResponse } from '@globalTypes/response.types';

type GetTasksResponseType = {
	items: TaskType[];
	totalCount: number;
	error: string | null;
};

export const tasksApi = todoInstance.injectEndpoints({
	endpoints: (build) => ({
		getTasks: build.query<GetTasksResponseType, string>({
			query: (todolistId) => ({
				url: `todo-lists/${todolistId}/tasks`,
				method: 'GET',
			}),
			// Кэш задач метим тегом "Task" для всего списка и (опционально) для каждой задачи
			providesTags: (result, error, todolistId) => [
				{ type: 'Task' as const, id: todolistId },
				...(result?.items ?? []).map((t) => ({ type: 'Task' as const, id: t.id })),
			],
		}),
		createTask: build.mutation<BaseResponse<{ item: TaskType }>, { todolistId: string; title: string }>({
			query: ({ todolistId, title }) => ({
				url: `todo-lists/${todolistId}/tasks`,
				method: 'POST',
				body: { title },
			}),
			invalidatesTags: ['Task'],
		}),
		updateTask: build.mutation<BaseResponse, { todoListId: string; taskId: string; task: UpdateTaskModel }>({
			query: ({ todoListId, taskId, task }) => ({
				url: `todo-lists/${todoListId}/tasks/${taskId}`,
				method: 'PUT',
				body: task,
			}),
			invalidatesTags: ['Task'],
		}),
		deleteTask: build.mutation<BaseResponse, { todoListId: string; taskId: string }>({
			query: ({ todoListId, taskId }) => ({
				url: `todo-lists/${todoListId}/tasks/${taskId}`,
				method: 'DELETE',
			}),
			// Инвалидируем конкретную задачу и список задач этого тудулиста
			invalidatesTags: (result, error, { todoListId, taskId }) => [
				{ type: 'Task', id: taskId },
				{ type: 'Task', id: todoListId },
			],
		}),
	}),
	overrideExisting: false,
});

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;
