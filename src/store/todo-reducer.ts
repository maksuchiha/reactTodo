import { TodoListType } from '../features/TodoLists/api/types';
import { todoListsApi } from '../features/TodoLists/api/todolists-api';
import { AppThunk } from './store';
import { RequestStatus, setAppErrorAC, setAppStatusAC } from './app-reducer';
import { ResultCode } from './tasks-reducer';

export type TodoFilterType = 'all' | 'completed' | 'progress';
export type TodolistStateType = TodoListType & {
	filter: TodoFilterType;
	entityStatus: RequestStatus;
};
type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>;
type AddNewTodoListACType = ReturnType<typeof addNewTodoListAC>;
type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>;
type SetTodoListsACType = ReturnType<typeof setTodoListsAC>;
type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>;
export type TodoReducerACType =
	| ChangeTodoListFilterACType
	| AddNewTodoListACType
	| RemoveTodoListACType
	| ChangeTodoListTitleACType
	| SetTodoListsACType
	| ChangeTodolistEntityStatusACType;

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
				entityStatus: 'idle',
			};
			return [newTodoList, ...state];
		}
		case 'REMOVE-TODOLIST': {
			return state.filter((tl) => tl.id !== action.payload.todolistId);
		}
		case 'CHANGE-TODOLIST-TITLE': {
			return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.newTitle } : tl));
		}
		case 'CHANGE-TODOLIST-ENTITY-STATUS': {
			return state.map((tl) =>
				tl.id === action.payload.todolistId ? { ...tl, entityStatus: action.payload.entityStatus } : tl,
			);
		}
		default: {
			return state;
		}
	}
};

export const fetchTodoListsTC = (): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'));
	todoListsApi.getTodoLists().then((res) => {
		const getState: TodolistStateType[] = res.data.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
		dispatch(setTodoListsAC(getState));
		dispatch(setAppStatusAC('succeeded'));
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
		dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
		todoListsApi.deleteTodoList(todolistId).then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(removeTodoListAC(todolistId));
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
	(todolistId: string, title: string): AppThunk =>
	(dispatch) => {
		dispatch(setAppStatusAC('loading'));
		todoListsApi.updateTodoList(todolistId, title).then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(changeTodoListTitleAC(todolistId, title));
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

export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatus) => {
	return {
		type: 'CHANGE-TODOLIST-ENTITY-STATUS',
		payload: {
			todolistId,
			entityStatus,
		},
	} as const;
};
