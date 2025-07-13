import { TodoListType } from '@features/TodoLists/api/types';
import { RequestStatus, setAppErrorAC, setAppStatusAC } from './app-slice';
import { todoListsApi } from '@features/TodoLists/api/todolists-api';
import { createAppSlice } from '../utils/thunks/todo';
import { ResultCode } from '@features/TodoLists/api/types/enums';

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
					thunkAPI.dispatch(setAppStatusAC('succeeded'));
					return { todoList: res.data.data.item };
				} catch (error) {
					return thunkAPI.rejectWithValue(`Failed to fetch todoLists - ${error}`);
				}
			},
			{
				fulfilled: (state, action) => {
					const newTodoList: TodolistStateType = {
						...action.payload.todoList,
						filter: 'all',
						entityStatus: 'idle',
					};
					return [newTodoList, ...state];
				},
			},
		),
		removeTodoListTC: create.asyncThunk(
			async (todolistId: string, thunkAPI) => {
				thunkAPI.dispatch(setAppStatusAC('loading'));
				try {
					await todoListsApi.deleteTodoList(todolistId);
					thunkAPI.dispatch(setAppStatusAC('succeeded'));
					return { todolistId };
				} catch (error) {
					return thunkAPI.rejectWithValue(`Failed to fetch todoLists - ${error}`);
				}
			},
			{
				fulfilled: (state, action) => {
					if (!action.payload?.todolistId) return;

					return state.filter((tl) => tl.id !== action.payload?.todolistId);
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
						return payload;
					} else {
						if (res.data.messages.length) {
							thunkAPI.dispatch(setAppErrorAC(res.data.messages[0]));
						} else {
							thunkAPI.dispatch(setAppErrorAC('Some error occurred'));
						}
						thunkAPI.dispatch(setAppStatusAC('failed'));
					}
				} catch (error) {
					return thunkAPI.rejectWithValue(error);
				}
			},
			{
				fulfilled: (state, action) => {
					if (!action.payload?.todolistId) return;

					return state.map((tl) =>
						tl.id === action.payload?.todolistId ? { ...tl, title: action.payload.newTitle } : tl,
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
