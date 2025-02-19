import { todoReducer, TodoReducerACType } from './todo-reducer';
import { combineReducers } from 'redux';
import { Action, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { tasksReducer, TasksReducerACType } from './tasks-reducer';
import { appReducer, AppReducerACType } from './app-reducer';

const rootReducer = combineReducers({
	todoLists: todoReducer,
	todoTasks: tasksReducer,
	ui: appReducer,
});

export type AppActionsTypes = TodoReducerACType | TasksReducerACType | AppReducerACType;

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch<A extends Action = AppActionsTypes> = ThunkDispatch<AppRootState, unknown, A>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, Action>;

export const store = configureStore({
	reducer: rootReducer,
});
