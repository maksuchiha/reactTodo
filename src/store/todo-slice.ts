import { TodoListType } from '@features/TodoLists/api/types';
import { RequestStatus, setAppStatusAC } from './app-slice';
import { todoListsApi } from '@features/TodoLists/api/todolists-api';
import { createAppSlice } from '../utils/thunks/todo';
import { ResultCode } from '@features/TodoLists/api/types/enums';
import { handleServerAppError } from '../utils/serverResponse/handleServerAppError';
import { handleServerNetworkError } from '../utils/serverResponse/handleServerNetworkError';

export type TodoFilterType = 'all' | 'completed' | 'progress';
export type TodolistStateType = TodoListType & {
	filter: TodoFilterType;
	entityStatus: RequestStatus;
};

export const todoListsSlice = createAppSlice({
	name: 'todoLists',
	initialState: [] as TodolistStateType[],
	reducers: (create) => ({
		fetchTodoListsTC: create.asyncThunk(
			async (_, thunkAPI) => {
				thunkAPI.dispatch(setAppStatusAC('loading'));
				try {
					const res = await todoListsApi.getTodoLists();
					thunkAPI.dispatch(setAppStatusAC('succeeded'));
					return { todoLists: res.data };
				} catch (error) {
					handleServerNetworkError(error, thunkAPI.dispatch);
					return thunkAPI.rejectWithValue(`Failed to fetch todoLists - ${error}`);
				}
			},
			{
				fulfilled: (_, action) => {
					return action.payload.todoLists.map((tl) => ({
						...tl,
						filter: 'all',
						entityStatus: 'idle',
					}));
				},
			},
		),
		addNewTodoListTC: create.asyncThunk(
			async (newTitle: string, thunkAPI) => {
				thunkAPI.dispatch(setAppStatusAC('loading'));
				try {
					const res = await todoListsApi.createTodoList(newTitle);
					if (res.data.resultCode === ResultCode.Success) {
						thunkAPI.dispatch(setAppStatusAC('succeeded'));
						return { todoList: res.data.data.item };
					} else {
						handleServerAppError(res.data, thunkAPI.dispatch);
						return thunkAPI.rejectWithValue(`Add new todo error`);
					}
				} catch (error: unknown) {
					handleServerNetworkError(error, thunkAPI.dispatch);
					return thunkAPI.rejectWithValue(`Failed to add todoLists - ${error}`);
				}
			},
			{
				fulfilled: (state, action) => {
					const newTodoList: TodolistStateType = {
						...action.payload.todoList,
						filter: 'all',
						entityStatus: 'idle',
					};
					state.unshift(newTodoList);
				},
			},
		),
		removeTodoListTC: create.asyncThunk(
			async (todolistId: string, thunkAPI) => {
				thunkAPI.dispatch(setAppStatusAC('loading'));
				try {
					const res = await todoListsApi.deleteTodoList(todolistId);
					if (res.data.resultCode === ResultCode.Success) {
						thunkAPI.dispatch(setAppStatusAC('succeeded'));
						return { todolistId };
					} else {
						handleServerAppError(res.data, thunkAPI.dispatch);
						return thunkAPI.rejectWithValue(`remove todo error`);
					}
				} catch (error) {
					handleServerNetworkError(error, thunkAPI.dispatch);
					return thunkAPI.rejectWithValue(`Failed to remove todoList - ${error}`);
				}
			},
			{
				fulfilled: (state, action) => {
					return state.filter((tl) => tl.id !== action.payload.todolistId);
				},
			},
		),
		changeTodoListTitleTC: create.asyncThunk(
			async (payload: { todolistId: string; newTitle: string }, thunkAPI) => {
				thunkAPI.dispatch(setAppStatusAC('loading'));
				try {
					const res = await todoListsApi.updateTodoList(payload);

					if (res.data.resultCode === ResultCode.Success) {
						thunkAPI.dispatch(setAppStatusAC('succeeded'));
						return { todolistId: payload.todolistId, newTitle: payload.newTitle };
					} else {
						handleServerAppError(res.data, thunkAPI.dispatch);
						return thunkAPI.rejectWithValue(`Change todo title error`);
					}
				} catch (error) {
					handleServerNetworkError(error, thunkAPI.dispatch);
					return thunkAPI.rejectWithValue(`Failed to change todoList title - ${error}`);
				}
			},
			{
				fulfilled: (state, action) => {
					return state.map((tl) =>
						tl.id === action.payload.todolistId ? { ...tl, title: action.payload.newTitle } : tl,
					);
				},
			},
		),
		changeTodoListFilterAC: create.reducer<{ todoListId: string; filterValue: TodoFilterType }>((state, action) => {
			return state.map((tl) =>
				tl.id === action.payload.todoListId ? { ...tl, filter: action.payload.filterValue } : tl,
			);
		}),
		changeTodolistEntityStatusAC: create.reducer<{ todolistId: string; entityStatus: RequestStatus }>(
			(state, action) => {
				return state.map((tl) =>
					tl.id === action.payload.todolistId ? { ...tl, entityStatus: action.payload.entityStatus } : tl,
				);
			},
		),
	}),
});

export const {
	fetchTodoListsTC,
	addNewTodoListTC,
	changeTodoListTitleTC,
	changeTodolistEntityStatusAC,
	changeTodoListFilterAC,
	removeTodoListTC,
} = todoListsSlice.actions;
export const todoListsReducer = todoListsSlice.reducer;
