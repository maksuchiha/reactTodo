import { TodoListType } from '../features/TodoLists/api/types';
import { todoListsApi } from '../features/TodoLists/api/todolists-api';
import { AppDispatch } from './store';

export type TodoFilterType = 'all' | 'completed' | 'progress';
export type TodolistStateType = TodoListType & {
	filter: TodoFilterType;
};
type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>;
type AddNewTodoListACType = ReturnType<typeof addNewTodoListAC>;
type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>;
type setTodoListsACType = ReturnType<typeof setTodoListsAC>;
type TodoReducerACType =
	| ChangeTodoListFilterACType
	| AddNewTodoListACType
	| RemoveTodoListACType
	| ChangeTodoListTitleACType
	| setTodoListsACType;

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

export const fetchTodoListsTC = () => (dispatch: AppDispatch) => {
	todoListsApi.getTodoLists().then((res) => {
		const getState: TodolistStateType[] = res.data.map((tl) => ({ ...tl, filter: 'all' }));
		dispatch(setTodoListsAC(getState));
	});
};

export const addNewTodoListTC = (title: string) => (dispatch: AppDispatch) => {
	todoListsApi.createTodoList(title).then((res) => {
		dispatch(addNewTodoListAC(res.data.data.item));
	});
};

export const removeTodoListTC = (todolistId: string) => (dispatch: AppDispatch) => {
	todoListsApi.deleteTodoList(todolistId).then(() => {
		dispatch(removeTodoListAC(todolistId));
	});
};

export const changeTodoListTitleTC = (todolistId: string, title: string) => (dispatch: AppDispatch) => {
	todoListsApi.updateTodoList(todolistId, title).then(() => {
		dispatch(changeTodoListTitleAC(todolistId, title));
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
