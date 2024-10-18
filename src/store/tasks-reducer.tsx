import { AppDispatch, AppRootState } from './store';
import { tasksApi } from '../features/TodoLists/api/tasks-api';
import { TaskType } from '../features/TodoLists/api/types';

export enum TaskStatus {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3,
}

export enum TaskPriority {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4,
}

export type TasksStateType = {
	[key: string]: TaskType[];
};
type UpdateTaskACType = ReturnType<typeof updateTaskAC>;
type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type AddNewTaskACType = ReturnType<typeof addNewTaskAC>;
type AddNewTasksInTodoListACType = ReturnType<typeof addNewTasksInTodoListAC>;
type RemoveTasksACType = ReturnType<typeof removeTasksAC>;
type SetTasksACType = ReturnType<typeof setTasksAC>;
type TasksReducerACType =
	| UpdateTaskACType
	| RemoveTaskACType
	| AddNewTaskACType
	| AddNewTasksInTodoListACType
	| RemoveTasksACType
	| SetTasksACType;

export const tasksReducer = (state: TasksStateType = {}, action: TasksReducerACType): TasksStateType => {
	switch (action.type) {
		case 'SET-TASKS': {
			return {
				...state,
				[action.payload.todolistId]: action.payload.tasks,
			};
		}
		case 'REMOVE-TASK': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
			};
		}
		case 'ADD-NEW-TASK': {
			return {
				...state,
				[action.payload.todolistId]: [action.payload.newTask, ...state[action.payload.todolistId]],
			};
		}
		case 'ADD-NEW-TODOLIST': {
			return { ...state, [action.payload.todolistId]: [] };
		}
		case 'REMOVE-TODOLIST': {
			const newState = { ...state };
			delete newState[action.payload.todolistId];
			return newState;
		}
		case 'UPDATE-TASK': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
					t.id === action.payload.taskId ? { ...action.payload.updatedTask } : t,
				),
			};
		}
		default: {
			return state;
		}
	}
};

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
	if (!todolistId) return;
	tasksApi.getTasks(todolistId).then((res) => {
		const tasks: TaskType[] = res.data.items;
		dispatch(setTasksAC(todolistId, tasks));
	});
};

export const removeTaskTC = (todolistId: string, taskKId: string) => (dispatch: AppDispatch) => {
	if (!todolistId || !taskKId) return;
	tasksApi.deleteTask(todolistId, taskKId).then(() => {
		dispatch(removeTaskAC(todolistId, taskKId));
	});
};

export const addNewTaskTC = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
	if (!todolistId || !title) return;
	tasksApi.createTask(todolistId, title).then((res) => {
		dispatch(addNewTaskAC(todolistId, res.data.data.item));
	});
};

export const updateTaskTC =
	(todolistId: string, taskId: string, newValue: string | number) =>
	(dispatch: AppDispatch, getState: () => AppRootState) => {
		const task = getState().todoTasks[todolistId].find((t) => t.id === taskId);

		if (task) {
			let model: TaskType;

			switch (typeof newValue) {
				case 'string': {
					model = {
						...task,
						title: newValue,
					};
					break;
				}
				case 'number': {
					model = {
						...task,
						status: newValue,
					};
					break;
				}
				default: {
					model = { ...task };
				}
			}

			tasksApi.updateTask(todolistId, taskId, model).then(() => {
				dispatch(updateTaskAC(todolistId, taskId, model));
			});
		}
	};

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
	return {
		type: 'SET-TASKS',
		payload: {
			todolistId,
			tasks,
		},
	} as const;
};

export const updateTaskAC = (todolistId: string, taskId: string, updatedTask: TaskType) => {
	return {
		type: 'UPDATE-TASK',
		payload: {
			todolistId,
			taskId,
			updatedTask,
		},
	} as const;
};

export const removeTaskAC = (todolistId: string, taskId: string) => {
	return {
		type: 'REMOVE-TASK',
		payload: {
			todolistId,
			taskId,
		},
	} as const;
};

export const addNewTaskAC = (todolistId: string, newTask: TaskType) => {
	return {
		type: 'ADD-NEW-TASK',
		payload: {
			todolistId,
			newTask,
		},
	} as const;
};

export const addNewTasksInTodoListAC = (todolistId: string) => {
	return {
		type: 'ADD-NEW-TODOLIST',
		payload: {
			todolistId,
		},
	} as const;
};

export const removeTasksAC = (todolistId: string) => {
	return {
		type: 'REMOVE-TODOLIST',
		payload: {
			todolistId,
		},
	} as const;
};
