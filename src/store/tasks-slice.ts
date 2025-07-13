import { TaskType } from '@features/TodoLists/api/types';
import { createAppSlice } from '../utils/thunks/todo';
import { setAppErrorAC, setAppStatusAC } from './app-slice';
import { tasksApi } from '@features/TodoLists/api/tasks-api';
import { ResultCode } from '@features/TodoLists/api/types/enums';
import { AppDispatchType, AppRootState } from '@store/store';

export type TasksStateType = {
	[key: string]: TaskType[];
};

export const handleServerAppResponse = (
	res: { data: { resultCode: number; messages: string[] } },
	dispatch: AppDispatchType,
): boolean => {
	if (res.data.resultCode === ResultCode.Success) {
		dispatch(setAppStatusAC('succeeded'));
		return true;
	} else {
		if (res.data.messages.length) {
			dispatch(setAppErrorAC(res.data.messages[0]));
		} else {
			dispatch(setAppErrorAC('Some error occurred'));
		}
		dispatch(setAppStatusAC('failed'));
		return false;
	}
};

const tasksSlice = createAppSlice({
	name: 'tasks',
	initialState: {} as TasksStateType,
	reducers: (create) => ({
		fetchTasksTC: create.asyncThunk(
			async (todolistId: string, thunkAPI) => {
				thunkAPI.dispatch(setAppStatusAC('loading'));
				try {
					const res = await tasksApi.getTasks(todolistId);

					thunkAPI.dispatch(setAppStatusAC('succeeded'));
					return { todolistId, tasks: res.data.items };
				} catch (error) {
					return thunkAPI.rejectWithValue(`Failed to fetch tasks - ${error}`);
				}
			},
			{
				fulfilled: (state, action) => {
					state[action.payload.todolistId] = action.payload.tasks;
				},
			},
		),
		removeTaskTC: create.asyncThunk(
			async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
				thunkAPI.dispatch(setAppStatusAC('loading'));
				const res = await tasksApi.deleteTask(payload.todolistId, payload.taskId);
				handleServerAppResponse(res, thunkAPI.dispatch as AppDispatchType);
				return { todolistId: payload.todolistId, taskId: payload.taskId };
			},
			{
				fulfilled: (state, action) => {
					state[action.payload.todolistId] = state[action.payload.todolistId].filter(
						(t) => t.id !== action.payload.taskId,
					);
				},
			},
		),
		addNewTaskTC: create.asyncThunk(
			async (payload: { todolistId: string; title: string }, thunkAPI) => {
				thunkAPI.dispatch(setAppStatusAC('loading'));
				const res = await tasksApi.createTask(payload.todolistId, payload.title);
				handleServerAppResponse(res, thunkAPI.dispatch as AppDispatchType);
				return { newTask: res.data.data.item, todolistId: payload.todolistId };
			},
			{
				fulfilled: (state, action) => {
					state[action.payload.todolistId].unshift(action.payload.newTask);
				},
			},
		),
		updateTaskTC: create.asyncThunk(
			async (payload: { todolistId: string; taskId: string; newValue: string | number }, thunkAPI) => {
				thunkAPI.dispatch(setAppStatusAC('loading'));

				const state = thunkAPI.getState() as AppRootState;
				const task = state.todoTasks[payload.todolistId].find((t: TaskType) => t.id === payload.taskId);
				let updatedTask: TaskType;

				if (!task) {
					thunkAPI.dispatch(setAppErrorAC('Task not found'));
					return thunkAPI.rejectWithValue(`Failed to update task`);
				}

				switch (typeof payload.newValue) {
					case 'string': {
						updatedTask = {
							...task,
							title: payload.newValue,
						};
						break;
					}
					case 'number': {
						updatedTask = {
							...task,
							status: payload.newValue,
						};
						break;
					}
					default: {
						updatedTask = { ...task };
					}
				}
				const res = await tasksApi.updateTask(payload.todolistId, payload.taskId, updatedTask);
				handleServerAppResponse(res, thunkAPI.dispatch as AppDispatchType);
				return { todolistId: payload.todolistId, taskId: payload.taskId, updatedTask };
			},
			{
				fulfilled: (state, action) => {
					state[action.payload.todolistId] = state[action.payload.todolistId].map((t) =>
						t.id === action.payload.taskId ? { ...action.payload.updatedTask } : t,
					);
				},
			},
		),
		// updateTaskAC: create.reducer<{ todolistId: string; taskId: string; updatedTask: TaskType }>((state, action) => {
		// 	return {
		// 		...state,
		// 		[action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
		// 			t.id === action.payload.taskId ? { ...action.payload.updatedTask } : t,
		// 		),
		// 	};
		// }),
		addNewTodoListAC: create.reducer<{ todolistId: string }>((state, action) => {
			const newState = { ...state };
			delete newState[action.payload.todolistId];
			return newState;
		}),
	}),
});

export const { fetchTasksTC, removeTaskTC, updateTaskTC, addNewTaskTC } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
