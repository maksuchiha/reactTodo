import { createSlice } from '@reduxjs/toolkit';
import { TodoListType } from '../features/TodoLists/api/types';
import { RequestStatus } from './app-slice';

export type TodoFilterType = 'all' | 'completed' | 'progress';
export type TodolistStateType = TodoListType & {
	filter: TodoFilterType;
	entityStatus: RequestStatus;
};

const todolistsSlice = createSlice({
	name: 'todolists',
	initialState: [] as TodolistStateType[],
	reducers: (create) => ({
		setTodoListsAC: create.reducer<TodolistStateType[]>((state, action) => {
			return action.payload.map((tl) => ({ ...tl }));
		}),
		removeTodoListAC: create.reducer<{ todolistId: string }>((state, action) => {
			return state.filter((tl) => tl.id !== action.payload.todolistId);
		}),
		changeTodoListTitleAC: create.reducer<{ todolistId: string; newTitle: string }>((state, action) => {
			return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.newTitle } : tl));
		}),
		changeTodoListFilterAC: create.reducer<{ todoListId: string; filterValue: TodoFilterType }>((state, action) => {
			return state.map((tl) =>
				tl.id === action.payload.todoListId ? { ...tl, filter: action.payload.filterValue } : tl,
			);
		}),
		addNewTodoListAC: create.reducer<TodoListType>((state, action) => {
			const newTodoList: TodolistStateType = {
				...action.payload,
				filter: 'all',
				entityStatus: 'idle',
			};
			return [newTodoList, ...state];
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
	setTodoListsAC,
	removeTodoListAC,
	changeTodoListTitleAC,
	changeTodoListFilterAC,
	addNewTodoListAC,
	changeTodolistEntityStatusAC,
} = todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;
