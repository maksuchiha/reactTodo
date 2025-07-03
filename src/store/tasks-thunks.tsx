import { AppRootState, AppThunk } from './store';
import { tasksApi } from '../features/TodoLists/api/tasks-api';
import { DomainTaskSchema, TaskType } from '../features/TodoLists/api/types';
import { setAppErrorAC, setAppStatusAC } from './app-slice';
import { ResultCode } from '../features/TodoLists/api/types/enums';
import { removeTaskAC, setTasksAC, addNewTaskAC, updateTaskAC } from './tasks-slice';

export type TasksStateType = {
	[key: string]: TaskType[];
};

export const fetchTasksTC =
	(todolistId: string): AppThunk =>
	(dispatch) => {
		if (!todolistId) return;
		dispatch(setAppStatusAC('loading'));
		tasksApi.getTasks(todolistId).then((res) => {
			const tasks: TaskType[] = DomainTaskSchema.array().parse(res.data.items);
			dispatch(setTasksAC({ todolistId, tasks }));
			dispatch(setAppStatusAC('succeeded'));
		});
	};

export const removeTaskTC =
	(todolistId: string, taskId: string): AppThunk =>
	(dispatch) => {
		if (!todolistId || !taskId) return;
		dispatch(setAppStatusAC('loading'));
		tasksApi.deleteTask(todolistId, taskId).then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(removeTaskAC({ todolistId, taskId }));
				dispatch(setAppStatusAC('succeeded'));
			} else {
				if (res.data.messages.length) {
					dispatch(setAppErrorAC(res.data.messages[0]));
				} else {
					dispatch(setAppErrorAC('Some error occurred'));
				}
				dispatch(setAppStatusAC('failed'));
			}
		});
	};

export const addNewTaskTC =
	(todolistId: string, title: string): AppThunk =>
	(dispatch) => {
		if (!todolistId || !title) return;
		dispatch(setAppStatusAC('loading'));
		tasksApi.createTask(todolistId, title).then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(addNewTaskAC({ todolistId, newTask: res.data.data.item }));
				dispatch(setAppStatusAC('succeeded'));
			} else {
				if (res.data.messages.length) {
					dispatch(setAppErrorAC(res.data.messages[0]));
				} else {
					dispatch(setAppErrorAC('Some error occurred'));
				}
				dispatch(setAppStatusAC('failed'));
			}
		});
	};

export const updateTaskTC =
	(todolistId: string, taskId: string, newValue: string | number): AppThunk =>
	(dispatch, getState: () => AppRootState) => {
		dispatch(setAppStatusAC('loading'));
		const task = getState().todoTasks[todolistId].find((t: TaskType) => t.id === taskId);

		if (task) {
			let updatedTask: TaskType;

			switch (typeof newValue) {
				case 'string': {
					updatedTask = {
						...task,
						title: newValue,
					};
					break;
				}
				case 'number': {
					updatedTask = {
						...task,
						status: newValue,
					};
					break;
				}
				default: {
					updatedTask = { ...task };
				}
			}

			tasksApi.updateTask(todolistId, taskId, updatedTask).then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(updateTaskAC({ todolistId, taskId, updatedTask }));
					dispatch(setAppStatusAC('succeeded'));
				} else {
					if (res.data.messages.length) {
						dispatch(setAppErrorAC(res.data.messages[0]));
					} else {
						dispatch(setAppErrorAC('Some error occurred'));
					}
					dispatch(setAppStatusAC('failed'));
				}
			});
		}
	};
