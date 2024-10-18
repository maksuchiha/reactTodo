import React, { FC, memo } from 'react';
import { EditSpan } from '../EditSpan';

type TaskPropsType = {
	taskId: string;
	title: string;
	completed: boolean;
	updateTaskStatus: (taskId: string, newStatus: boolean) => void;
	changeTaskTitle: (taskId: string, newTitle: string) => void;
	removeTask: (taskId: string) => void;
};

export const Task: FC<TaskPropsType> = memo(
	({ taskId, title, completed, updateTaskStatus, changeTaskTitle, removeTask }) => {
		return (
			<li>
				<input
					type="checkbox"
					checked={completed}
					onChange={(e) => updateTaskStatus(taskId, e.currentTarget.checked)}
				/>
				<EditSpan title={title} changeTitle={(newTitle: string) => changeTaskTitle(taskId, newTitle)} />
				<button onClick={() => removeTask(taskId)}>x</button>
			</li>
		);
	},
);
