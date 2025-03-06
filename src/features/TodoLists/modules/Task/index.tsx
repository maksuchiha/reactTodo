import React, { FC, memo } from 'react';
import { EditSpan } from '../EditSpan';

type TaskPropsType = {
	taskId: string;
	title: string;
	completed: boolean;
	updateTaskStatus: (taskId: string, newStatus: boolean) => void;
	changeTaskTitle: (taskId: string, newTitle: string) => void;
	removeTask: (taskId: string) => void;
	disabled?: boolean;
};

export const Task: FC<TaskPropsType> = memo(
	({ taskId, title, completed, updateTaskStatus, changeTaskTitle, removeTask, disabled }) => {
		return (
			<li>
				<input
					type="checkbox"
					checked={completed}
					onChange={(e) => updateTaskStatus(taskId, e.currentTarget.checked)}
					disabled={disabled}
				/>
				<EditSpan
					title={title}
					changeTitle={(newTitle: string) => changeTaskTitle(taskId, newTitle)}
					disabled={disabled}
				/>
				<button onClick={() => removeTask(taskId)} disabled={disabled}>
					x
				</button>
			</li>
		);
	},
);
