import { createSlice } from '@reduxjs/toolkit';
import { TodoListType } from '../features/TodoLists/api/types';
import { RequestStatus } from './app-slice';
import { addNewTodoListTC, changeTodoListTitleTC, fetchTodoListsTC, removeTodoListTC } from './todo-thunks';

export type TodoFilterType = 'all' | 'completed' | 'progress';
export type TodolistStateType = TodoListType & {
	filter: TodoFilterType;
	entityStatus: RequestStatus;
};

export const todoListsSlice = createSlice({
	name: 'todoLists',
	initialState: [] as TodolistStateType[],
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodoListsTC.fulfilled, (_, action) => {
				return action.payload.todoLists.map((tl) => ({
					...tl,
					filter: 'all',
					entityStatus: 'idle',
				}));
			})
			.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
				if (!action.payload?.todolistId) return;

				return state.map((tl) =>
					tl.id === action.payload?.todolistId ? { ...tl, title: action.payload.newTitle } : tl,
				);
			})
			.addCase(addNewTodoListTC.fulfilled, (state, action) => {
				const newTodoList: TodolistStateType = {
					...action.payload.todoList,
					filter: 'all',
					entityStatus: 'idle',
				};
				return [newTodoList, ...state];
			})
			.addCase(removeTodoListTC.fulfilled, (state, action) => {
				if (!action.payload?.todolistId) return;

				return state.filter((tl) => tl.id !== action.payload?.todolistId);
			})
			.addCase(fetchTodoListsTC.rejected, (_, action) => {
				// обработка ошибки при запросе за тудулистами
				console.log(action.payload);
			});
	},
	reducers: (create) => ({
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

export const { changeTodoListFilterAC, changeTodolistEntityStatusAC } = todoListsSlice.actions;
export const todoListsReducer = todoListsSlice.reducer;
