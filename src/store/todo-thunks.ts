import { TodoListType } from '../features/TodoLists/api/types';
import { todoListsApi } from '../features/TodoLists/api/todolists-api';
import { AppThunk } from './store';
import { RequestStatus, setAppErrorAC, setAppStatusAC } from './app-slice';
import { ResultCode } from '../features/TodoLists/api/types/enums';
import {
	addNewTodoListAC,
	changeTodolistEntityStatusAC,
	changeTodoListTitleAC,
	removeTodoListAC,
	setTodoListsAC,
} from './todo-slice';

export type TodoFilterType = 'all' | 'completed' | 'progress';
export type TodolistStateType = TodoListType & {
	filter: TodoFilterType;
	entityStatus: RequestStatus;
};

export const fetchTodoListsTC = (): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'));
	todoListsApi
		.getTodoLists()
		.then((res) => {
			const getState: TodolistStateType[] = res.data.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
			dispatch(setTodoListsAC(getState));
			dispatch(setAppStatusAC('succeeded'));
		})
		.catch((err) => {
			throw new Error(`${err}`);
		});
};

//another realisation
export const _fetchTodoListsTC = (): AppThunk => async (dispatch) => {
	try {
		const res = await todoListsApi.getTodoLists();
		const getState: TodolistStateType[] = res.data.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
		dispatch(setTodoListsAC(getState));
	} catch (err) {
		throw new Error(`${err}`);
	}
};

export const addNewTodoListTC =
	(title: string): AppThunk =>
	(dispatch) => {
		dispatch(setAppStatusAC('loading'));
		todoListsApi.createTodoList(title).then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(addNewTodoListAC(res.data.data.item));
				dispatch(setAppStatusAC('succeeded'));
			} else {
				if (res.data.messages.length) {
					dispatch(setAppErrorAC(res.data.messages[0]));
				} else {
					dispatch(setAppErrorAC('Some error occurred'));
				}
				dispatch(setAppStatusAC('failed'));
			}
		});
	};

export const removeTodoListTC =
	(todolistId: string): AppThunk =>
	(dispatch) => {
		dispatch(setAppStatusAC('loading'));
		dispatch(changeTodolistEntityStatusAC({ todolistId, entityStatus: 'loading' }));
		todoListsApi.deleteTodoList(todolistId).then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(removeTodoListAC({ todolistId }));
				dispatch(setAppStatusAC('succeeded'));
			} else {
				if (res.data.messages.length) {
					dispatch(setAppErrorAC(res.data.messages[0]));
				} else {
					dispatch(setAppErrorAC('Some error occurred'));
				}
				dispatch(setAppStatusAC('failed'));
			}
		});
	};

export const changeTodoListTitleTC =
	(todolistId: string, newTitle: string): AppThunk =>
	(dispatch) => {
		dispatch(setAppStatusAC('loading'));
		todoListsApi.updateTodoList(todolistId, newTitle).then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(changeTodoListTitleAC({ todolistId, newTitle }));
				dispatch(setAppStatusAC('succeeded'));
			} else {
				if (res.data.messages.length) {
					dispatch(setAppErrorAC(res.data.messages[0]));
				} else {
					dispatch(setAppErrorAC('Some error occurred'));
				}
				dispatch(setAppStatusAC('failed'));
			}
		});
	};
