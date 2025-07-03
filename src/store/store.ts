import { combineReducers } from 'redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { appReducer } from './app-slice';
import { todolistsReducer } from './todo-slice';
import { tasksReducer } from './tasks-slice';

const rootReducer = combineReducers({
	todoLists: todolistsReducer,
	todoTasks: tasksReducer,
	ui: appReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, Action>;

export const store = configureStore({
	reducer: rootReducer,
});
