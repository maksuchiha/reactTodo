import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './app-slice';
import { todoListsReducer } from './todo-slice';
import { tasksReducer } from './tasks-slice';
import { authReducer } from '@features/auth/model/auth-slice';

const rootReducer = combineReducers({
	todoLists: todoListsReducer,
	todoTasks: tasksReducer,
	auth: authReducer,
	ui: appReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatchType = typeof store.dispatch;

export const store = configureStore({
	reducer: rootReducer,
});
