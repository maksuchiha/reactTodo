import React, { FC, memo, useCallback, useMemo } from 'react';
import { EditSpan } from '../EditSpan';
import { TaskType, UpdateTaskModel } from '@features/TodoLists/api/types';
import { TaskStatus } from '@features/TodoLists/api/types/enums';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@features/TodoLists/api/tasks-api';

type TaskPropsType = {
	todoListId: string;
	task: TaskType;
	disabled?: boolean;
};

export const Task: FC<TaskPropsType> = memo(({ todoListId, task, disabled }) => {
	const [updateTask] = useUpdateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation();

	const updatedTask = useMemo<UpdateTaskModel>(
		() => ({
			title: task.title,
			description: task.description,
			status: task.status,
			priority: task.priority,
			startDate: task.startDate,
			deadline: task.deadline,
		}),
		[task.title, task.description, task.status, task.priority, task.startDate, task.deadline],
	);

	const updateTaskStatusHandler = useCallback(
		(taskId: string, newStatus: boolean) => {
			const getStatusNumber = newStatus ? TaskStatus.Completed : TaskStatus.New;

			updateTask({ todoListId, taskId, task: { ...updatedTask, status: getStatusNumber } });
		},
		[todoListId, updateTask, updatedTask],
	);

	const changeTaskTitleHandler = useCallback(
		(taskId: string, newTitle: string) => {
			updateTask({ todoListId, taskId, task: { ...updatedTask, title: newTitle } });
		},
		[todoListId, updateTask, updatedTask],
	);

	const removeTaskHandler = useCallback(
		(taskId: string) => {
			deleteTask({ todoListId, taskId });
		},
		[todoListId, deleteTask],
	);
	return (
		<li>
			<input
				type="checkbox"
				checked={task.status === TaskStatus.Completed}
				onChange={(e) => updateTaskStatusHandler(task.id, e.currentTarget.checked)}
				disabled={disabled}
			/>
			<EditSpan
				title={task.title}
				changeTitle={(newTitle: string) => changeTaskTitleHandler(task.id, newTitle)}
				disabled={disabled}
			/>
			<button onClick={() => removeTaskHandler(task.id)} disabled={disabled}>
				x
			</button>
		</li>
	);
});
