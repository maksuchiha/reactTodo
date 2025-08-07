import { DomainTaskSchema, TaskType, UpdateTaskModel } from '@features/TodoLists/api/types';
import { createAppSlice } from '@utils/thunks';
import { setAppErrorAC, setAppStatusAC } from './app-slice';
import { tasksApi } from '@features/TodoLists/api/tasks-api';
import { AppRootState } from '@store/store';
import { removeTodoListTC } from '@store/todo-slice';
import { handleServerAppError } from '@utils/serverResponse/handleServerAppError';
import { ResultCode } from '@features/TodoLists/api/types/enums';
import { handleServerNetworkError } from '@utils/serverResponse/handleServerNetworkError';
import { logOutTC } from '@features/auth/model/auth-slice';

export type TasksStateType = {
	[key: string]: TaskType[];
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
					DomainTaskSchema.array().parse(res.data.items);
					thunkAPI.dispatch(setAppStatusAC('succeeded'));
					return { todolistId, tasks: res.data.items };
				} catch (error) {
					handleServerNetworkError(error, thunkAPI.dispatch);
					return thunkAPI.rejectWithValue(`fetch tasks error`);
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
				try {
					const res = await tasksApi.deleteTask(payload.todolistId, payload.taskId);
					if (res.data.resultCode === ResultCode.Success) {
						thunkAPI.dispatch(setAppStatusAC('succeeded'));
						return { todolistId: payload.todolistId, taskId: payload.taskId };
					} else {
						handleServerAppError(res.data, thunkAPI.dispatch);
						return thunkAPI.rejectWithValue(`Remove task error`);
					}
				} catch (error: unknown) {
					handleServerNetworkError(error, thunkAPI.dispatch);
					return thunkAPI.rejectWithValue(`Remove task error`);
				}
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
				try {
					const res = await tasksApi.createTask(payload.todolistId, payload.title);
					if (res.data.resultCode === ResultCode.Success) {
						thunkAPI.dispatch(setAppStatusAC('succeeded'));
						return { newTask: res.data.data.item, todolistId: payload.todolistId };
					} else {
						handleServerAppError(res.data, thunkAPI.dispatch);
						return thunkAPI.rejectWithValue(`Add new task error`);
					}
				} catch (error: unknown) {
					handleServerNetworkError(error, thunkAPI.dispatch);
					return thunkAPI.rejectWithValue(`Add new task error`);
				}
			},
			{
				fulfilled: (state, action) => {
					state[action.payload.todolistId].unshift(action.payload.newTask);
				},
			},
		),
		updateTaskTC: create.asyncThunk(
			async (
				payload: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
				{ dispatch, getState, rejectWithValue },
			) => {
				dispatch(setAppStatusAC('loading'));

				const state = getState() as AppRootState;
				const task = state.todoTasks[payload.todolistId]?.find((t: TaskType) => t.id === payload.taskId);

				if (!task) {
					dispatch(setAppErrorAC('Task not found'));
					return rejectWithValue('Failed to update task: not found');
				}

				// Создаём полную модель для API из текущей задачи + переданных полей
				const updatedTask: UpdateTaskModel = {
					title: task.title,
					description: task.description,
					status: task.status,
					priority: task.priority,
					startDate: task.startDate,
					deadline: task.deadline,
					...payload.domainModel, // заменяем нужные поля
				};

				try {
					const res = await tasksApi.updateTask(payload.todolistId, payload.taskId, updatedTask);

					if (res.data.resultCode === ResultCode.Success) {
						dispatch(setAppStatusAC('succeeded'));
						return { todolistId: payload.todolistId, taskId: payload.taskId, updatedFields: payload.domainModel };
					} else {
						handleServerAppError(res.data, dispatch);
						return rejectWithValue(`Failed to update task`);
					}
				} catch (error: unknown) {
					handleServerNetworkError(error, dispatch);
					return rejectWithValue(`Failed to update task`);
				}
			},
			{
				fulfilled: (state, action) => {
					state[action.payload.todolistId] = state[action.payload.todolistId].map((t) =>
						t.id === action.payload.taskId ? { ...t, ...action.payload.updatedFields } : t,
					);
				},
			},
		),
	}),
	extraReducers: (builder) => {
		builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
			if (!action.payload?.todolistId) return;
			delete state[action.payload.todolistId];
		});
		builder.addCase(logOutTC.fulfilled, () => {
			return {};
		});
	},
});

export const { fetchTasksTC, removeTaskTC, updateTaskTC, addNewTaskTC } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
