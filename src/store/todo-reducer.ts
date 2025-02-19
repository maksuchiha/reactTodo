import { TodoListType } from '../features/TodoLists/api/types';
import { todoListsApi } from '../features/TodoLists/api/todolists-api';
import { AppThunk } from './store';
import { setAppStatusAC } from './app-reducer';

export type TodoFilterType = 'all' | 'completed' | 'progress';
export type TodolistStateType = TodoListType & {
	filter: TodoFilterType;
};
type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>;
type AddNewTodoListACType = ReturnType<typeof addNewTodoListAC>;
type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>;
type SetTodoListsACType = ReturnType<typeof setTodoListsAC>;
export type TodoReducerACType =
	| ChangeTodoListFilterACType
	| AddNewTodoListACType
	| RemoveTodoListACType
	| ChangeTodoListTitleACType
	| SetTodoListsACType;

export const todoReducer = (state: TodolistStateType[] = [], action: TodoReducerACType): TodolistStateType[] => {
	switch (action.type) {
		case 'SET-TODOLISTS': {
			return action.todoLists.map((tl) => ({ ...tl }));
		}
		case 'CHANGE-TODOLIST-FILTER': {
			return state.map((tl) =>
				tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filterValue } : tl,
			);
		}
		case 'ADD-NEW-TODOLIST': {
			const newTodoList: TodolistStateType = {
				...action.payload.newTodo,
				filter: 'all',
			};
			return [newTodoList, ...state];
		}
		case 'REMOVE-TODOLIST': {
			return state.filter((tl) => tl.id !== action.payload.todolistId);
		}
		case 'CHANGE-TODOLIST-TITLE': {
			return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.newTitle } : tl));
		}
		default: {
			return state;
		}
	}
};

export const fetchTodoListsTC = (): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'));
	todoListsApi.getTodoLists().then((res) => {
		const getState: TodolistStateType[] = res.data.map((tl) => ({ ...tl, filter: 'all' }));
		dispatch(setTodoListsAC(getState));
		dispatch(setAppStatusAC('succeeded'));
	});
};

export const _fetchTodoListsTC = (): AppThunk => async (dispatch) => {
	try {
		const res = await todoListsApi.getTodoLists();
		const getState: TodolistStateType[] = res.data.map((tl) => ({ ...tl, filter: 'all' }));
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
			dispatch(addNewTodoListAC(res.data.data.item));
			dispatch(setAppStatusAC('succeeded'));
		});
	};

export const removeTodoListTC =
	(todolistId: string): AppThunk =>
	(dispatch) => {
		dispatch(setAppStatusAC('loading'));
		todoListsApi.deleteTodoList(todolistId).then(() => {
			dispatch(removeTodoListAC(todolistId));
			dispatch(setAppStatusAC('succeeded'));
		});
	};

export const changeTodoListTitleTC =
	(todolistId: string, title: string): AppThunk =>
	(dispatch) => {
		dispatch(setAppStatusAC('loading'));
		todoListsApi.updateTodoList(todolistId, title).then(() => {
			dispatch(changeTodoListTitleAC(todolistId, title));
			dispatch(setAppStatusAC('succeeded'));
		});
	};

export const setTodoListsAC = (todoLists: TodolistStateType[]) => {
	return { type: 'SET-TODOLISTS', todoLists } as const;
};

export const changeTodoListFilterAC = (todolistId: string, filterValue: TodoFilterType) => {
	return {
		type: 'CHANGE-TODOLIST-FILTER',
		payload: {
			todolistId,
			filterValue,
		},
	} as const;
};

export const addNewTodoListAC = (newTodo: TodoListType) => {
	return {
		type: 'ADD-NEW-TODOLIST',
		payload: {
			newTodo,
		},
	} as const;
};

export const removeTodoListAC = (todolistId: string) => {
	return {
		type: 'REMOVE-TODOLIST',
		payload: {
			todolistId,
		},
	} as const;
};

export const changeTodoListTitleAC = (todolistId: string, newTitle: string) => {
	return {
		type: 'CHANGE-TODOLIST-TITLE',
		payload: {
			todolistId,
			newTitle,
		},
	} as const;
};
