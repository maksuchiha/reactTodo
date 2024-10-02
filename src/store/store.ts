import { todoReducer } from "./todo-reducer";
import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import {tasksReducer} from "./tasks-reducer";


const rootReducer = combineReducers({
    todoLists: todoReducer,
    todoTasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer
})