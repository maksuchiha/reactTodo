import s from "./todolist.module.scss";
import {FC, memo, useCallback} from "react";
import {TasksStateType, TaskType} from "@store/tasks-reducer";
import {AddInput} from "@components/ui/AddInput";
import {EditSpan} from "../EditSpan";
import {Task} from "../Task";
import {AppRootState} from "@store/store";
import {createSelector} from "reselect";
import {useSelector} from "react-redux";
import {TodoFilterType} from "@store/todo-reducer";

type TodoListPropsType = {
    id: string
    title: string
    filter: TodoFilterType
    changeFilterValue: (todoListId: string, filterValue: TodoFilterType) => void
    removeTask: (todoListId: string, taskId: string) => void
    addNewTask: (todoListId: string, newTaskName: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
    changeTaskStatus: (newStatus: boolean, taskId: string, todoListId: string) => void
}

export const TodoList: FC<TodoListPropsType> = memo(({
                                                         id,
                                                         title,
                                                         filter,
                                                         changeFilterValue,
                                                         removeTask,
                                                         addNewTask,
                                                         removeTodoList,
                                                         changeTaskTitle,
                                                         changeTodoListTitle,
                                                         changeTaskStatus
                                                     }) => {
    const getTasksState = (state: AppRootState): TasksStateType => state.todoTasks

    const selectTasksForTodoList = createSelector(
        [getTasksState, (_: AppRootState, todoListId: string) => todoListId],
        (tasks, todoListId) => tasks[todoListId] || []
    )

    const tasksForTodoList = useSelector((state: AppRootState) => selectTasksForTodoList(state, id))


    let filteredTasks: TaskType[]

    switch (filter) {
        case "completed": {
            filteredTasks = tasksForTodoList.filter(t => t.completed)
            break
        }
        case "progress": {
            filteredTasks = tasksForTodoList.filter(t => !t.completed)
            break
        }
        default: {
            filteredTasks = tasksForTodoList
        }
    }

    const changeTaskStatusHandler = useCallback((newStatus: boolean, taskId: string) => {
        changeTaskStatus(newStatus, taskId, id)
    }, [])

    const removeTaskHandler = useCallback((taskId: string) => {
        removeTask(id, taskId)
    }, [id])

    const getFilterStatus = useCallback((status: string) => {
        return filter === status ? `${s.filter__item} ${s.filter__item_active}` : `${s.filter__item}`
    }, [filter])

    const changeFilterHandler = useCallback((filterValue: TodoFilterType) => {
        changeFilterValue(id, filterValue)
    }, [id])

    const addNewTaskHandler = useCallback((newTaskName: string) => {
        addNewTask(id, newTaskName)
    }, [id])

    const removeTodoListHandler = useCallback(() => {
        removeTodoList(id)
    }, [id])

    const changeTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
        changeTaskTitle(id, taskId, newTitle)
    }, [id])

    const changeTodoListTitleHandler = useCallback((newTitle: string) => {
        changeTodoListTitle(id, newTitle)
    }, [id])

    const getTasks = filteredTasks.map(t => {
        return (
            <Task key={t.id}
                  taskId={t.id}
                  title={t.title}
                  completed={t.completed}
                  changeTaskStatus={changeTaskStatusHandler}
                  changeTaskTitle={changeTaskTitleHandler}
                  removeTask={removeTaskHandler}/>
        )
    })

    return (
        <div className={s.todolist}>
            <div className={s.todolist__title}>
                <EditSpan title={title} changeTitle={changeTodoListTitleHandler}/>
                <button onClick={removeTodoListHandler}>x</button>
            </div>
            <AddInput className={s.addNewTask} addItem={addNewTaskHandler} placeholder={'Добавить задачу'}/>
            <ul className={s.tasks}>
                {getTasks}
            </ul>
            <div className={s.filter}>
                <button className={getFilterStatus('all')} onClick={() => changeFilterHandler('all')}>all</button>
                <button className={getFilterStatus('completed')}
                        onClick={() => changeFilterHandler('completed')}>completed
                </button>
                <button className={getFilterStatus('progress')} onClick={() => changeFilterHandler('progress')}>In
                    progress
                </button>
            </div>
        </div>
    );
})