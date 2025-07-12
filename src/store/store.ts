import { combineReducers } from 'redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { appReducer } from './app-slice';
import { todoListsReducer } from './todo-slice';
import { tasksReducer } from './tasks-slice';

const rootReducer = combineReducers({
	todoLists: todoListsReducer,
	todoTasks: tasksReducer,
	ui: appReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatchType = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, Action>;

export const store = configureStore({
	reducer: rootReducer,
});
