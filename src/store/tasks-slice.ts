import { TaskType } from '../features/TodoLists/api/types';
import { createSlice } from '@reduxjs/toolkit';

export type TasksStateType = {
	[key: string]: TaskType[];
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState: {} as TasksStateType,
	reducers: (create) => ({
		setTasksAC: create.reducer<{ todolistId: string; tasks: TaskType[] }>((state, action) => {
			return {
				...state,
				[action.payload.todolistId]: action.payload.tasks,
			};
		}),
		addNewTaskAC: create.reducer<{ todolistId: string; newTask: TaskType }>((state, action) => {
			return {
				...state,
				[action.payload.todolistId]: [action.payload.newTask, ...state[action.payload.todolistId]],
			};
		}),
		updateTaskAC: create.reducer<{ todolistId: string; taskId: string; updatedTask: TaskType }>((state, action) => {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
					t.id === action.payload.taskId ? { ...action.payload.updatedTask } : t,
				),
			};
		}),
		removeTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
			};
		}),
		addNewTodoListAC: create.reducer<{ todolistId: string }>((state, action) => {
			const newState = { ...state };
			delete newState[action.payload.todolistId];
			return newState;
		}),
	}),
});

export const { setTasksAC, updateTaskAC, addNewTaskAC, removeTaskAC } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
