import React, {FC, memo} from 'react';
import {EditSpan} from "../EditSpan";

type TaskPropsType = {
    taskId: string
    title: string
    completed: boolean
    changeTaskStatus: (status: boolean, taskId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
}

export const Task: FC<TaskPropsType> = memo(({
                                                 taskId,
                                                 title,
                                                 completed,
                                                 changeTaskStatus,
                                                 changeTaskTitle,
                                                 removeTask
                                             }) => {
    return (
        <li>
            <input type="checkbox"
                   checked={completed}
                   onChange={(e) => changeTaskStatus(e.currentTarget.checked, taskId)}/>
            <EditSpan title={title} changeTitle={(newTitle: string) => changeTaskTitle(taskId, newTitle)}/>
            <button onClick={() => removeTask(taskId)}>x</button>
        </li>
    );
})