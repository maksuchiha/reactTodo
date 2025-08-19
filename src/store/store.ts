import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './app-slice';
import { todoListsApi } from '@features/TodoLists/api/todolists-api';
import { todoInstance } from '@instances/todo';

const rootReducer = combineReducers({
	[appSlice.name]: appSlice.reducer,
	[todoInstance.reducerPath]: todoInstance.reducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatchType = typeof store.dispatch;

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoListsApi.middleware),
});
