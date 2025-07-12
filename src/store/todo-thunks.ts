import { TodoListType } from '../features/TodoLists/api/types';
import { todoListsApi } from '../features/TodoLists/api/todolists-api';
import { setAppErrorAC, setAppStatusAC } from './app-slice';
import { ResultCode } from '../features/TodoLists/api/types/enums';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodoListsTC = createAsyncThunk<
	{ todoLists: TodoListType[] }, // ✅ что возвращает fulfilled
	void, // ✅ аргумент (в данном случае ничего)
	{ rejectValue: string } // ✅ что возвращает reject
>(`todoLists/fetchTodoListsTC`, async (_, thunkAPI) => {
	thunkAPI.dispatch(setAppStatusAC('loading'));
	try {
		const res = await todoListsApi.getTodoLists();
		thunkAPI.dispatch(setAppStatusAC('succeeded'));
		return { todoLists: res.data };
	} catch (error) {
		return thunkAPI.rejectWithValue(`Failed to fetch todoLists - ${error}`);
	}
});

export const changeTodoListTitleTC = createAsyncThunk(
	`todoLists/changeTodolistTitleTC`,
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
);

export const addNewTodoListTC = createAsyncThunk<
	{ todoList: TodoListType }, // ✅ что возвращает fulfilled
	string, // ✅ аргумент
	{ rejectValue: string } // ✅ что возвращает reject
>(`todoLists/addNewTodoListTC`, async (newTitle, thunkAPI) => {
	thunkAPI.dispatch(setAppStatusAC('loading'));
	try {
		const res = await todoListsApi.createTodoList(newTitle);
		thunkAPI.dispatch(setAppStatusAC('succeeded'));
		return { todoList: res.data.data.item };
	} catch (error) {
		return thunkAPI.rejectWithValue(`Failed to fetch todoLists - ${error}`);
	}
});

export const removeTodoListTC = createAsyncThunk<
	{ todolistId: string }, // ✅ что возвращает fulfilled
	string, // ✅ аргумент
	{ rejectValue: string } // ✅ что возвращает reject
>(`todoLists/removeTodoListTC`, async (todolistId, thunkAPI) => {
	thunkAPI.dispatch(setAppStatusAC('loading'));
	try {
		await todoListsApi.deleteTodoList(todolistId);
		thunkAPI.dispatch(setAppStatusAC('succeeded'));
		return { todolistId };
	} catch (error) {
		return thunkAPI.rejectWithValue(`Failed to fetch todoLists - ${error}`);
	}
});
