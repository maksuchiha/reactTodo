import { todoReducer } from './todo-reducer';
import { combineReducers } from 'redux';
import { configureStore, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { tasksReducer } from './tasks-reducer';

const rootReducer = combineReducers({
	todoLists: todoReducer,
	todoTasks: tasksReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>;

export const store = configureStore({
	reducer: rootReducer,
});
