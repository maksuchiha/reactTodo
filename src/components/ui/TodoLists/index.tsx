import {TodoList} from "./modules/TodoList";
import {FC, useCallback} from "react";
import s from "./todolists.module.scss"
import {
    addNewTodoListAC,
    changeTodoListFilterAC, changeTodoListTitleAC,
    removeTodoListAC, TodoFilterType,
    TodolistStateType
} from "@store/todo-reducer";
import {
    addNewTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "@store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "@store/store";
import {AddInput} from "@components/ui/AddInput";
import {v1} from "uuid";


export const TodoLists: FC = () => {
    const todoLists = useSelector<AppRootState, TodolistStateType[]>(state =>  state.todoLists)
    const dispatch = useDispatch()


    const changeFilterValue = useCallback((todoListId: string, filterValue: TodoFilterType) => {
        dispatch(changeTodoListFilterAC(todoListId, filterValue))
    }, [])

    const changeTaskStatus = useCallback((newStatus: boolean, taskId: string, todoListId: string) => {
        dispatch(changeTaskStatusAC(newStatus, taskId, todoListId))
    }, [dispatch])

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }, [dispatch])

    const addNewTask = useCallback((todoListId: string, newTaskName: string) => {
        dispatch(addNewTaskAC(todoListId, newTaskName))
    }, [dispatch])

    const addNewTodoList = useCallback((value: string) => {
        const newTodoListId = v1()
        dispatch(addNewTodoListAC(newTodoListId, value))
    },[dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((todoListId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, newTitle))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle))
    }, [dispatch])

    const getTodoLists = todoLists.map(tl => {
        return <TodoList key={tl.id}
                         id={tl.id}
                         title={tl.title}
                         filter={tl.filter}
                         changeFilterValue={changeFilterValue}
                         removeTask={removeTask}
                         addNewTask={addNewTask}
                         removeTodoList={removeTodoList}
                         changeTaskTitle={changeTaskTitle}
                         changeTodoListTitle={changeTodoListTitle}
                         changeTaskStatus={changeTaskStatus}/>
    })

    return (
        <div className={s.todoLists}>
            <div className={s.todoLists__top}>
                <AddInput className={s.addNewTask} addItem={addNewTodoList} placeholder={'Добавить список'}/>
            </div>
            <div className={s.todoLists__items}>
                {getTodoLists}
            </div>
        </div>
    );
}