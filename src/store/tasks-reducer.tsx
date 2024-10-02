import {todolistID1, todolistID2} from "./todo-reducer";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    completed: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddNewTaskACType = ReturnType<typeof addNewTaskAC>
type AddNewTasksInTodoListACType = ReturnType<typeof addNewTasksInTodoListAC>
type RemoveTasksACType = ReturnType<typeof removeTasksAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type TasksReducerACType = ChangeTaskStatusACType | RemoveTaskACType | AddNewTaskACType | AddNewTasksInTodoListACType | RemoveTasksACType | ChangeTaskTitleACType

const tasks: TasksStateType = ({
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', completed: true},
        {id: v1(), title: 'JS', completed: true},
        {id: v1(), title: 'ReactJS', completed: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', completed: true},
        {id: v1(), title: 'GraphQL', completed: false},
    ],
})

export const tasksReducer = (state: TasksStateType = tasks, action: TasksReducerACType): TasksStateType => {
    switch (action.type) {
        case "CHANGE-TASK-STATUS": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, completed: action.payload.newStatus} : t)}
        }
        case "REMOVE-TASK": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
        }
        case "ADD-NEW-TASK": {
            const newTask: TaskType = {id: v1(), title: action.payload.newTask, completed: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "ADD-NEW-TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            const newState = {...state};
            delete newState[action.payload.todolistId]
            return newState
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)}
        }
        default: {
            return state
        }
    }
}

export const changeTaskStatusAC = (newStatus: boolean, taskId: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            newStatus,
            taskId,
            todolistId
        }
    } as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}

export const addNewTaskAC = (todolistId: string, newTask: string) => {
    return {
        type: 'ADD-NEW-TASK',
        payload: {
            todolistId,
            newTask
        }
    } as const
}

export const addNewTasksInTodoListAC = (todolistId: string) => {
    return {
        type: 'ADD-NEW-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const removeTasksAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            taskId,
            newTitle
        }
    } as const
}