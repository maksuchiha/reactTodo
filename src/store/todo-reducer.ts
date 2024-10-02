import {v1} from "uuid";

export type TodoFilterType = 'all' | 'completed' | 'progress'
export type TodolistStateType = {
    id: string
    title: string
    filter: TodoFilterType
}
type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
type AddNewTodoListACType = ReturnType<typeof addNewTodoListAC>
type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
type ChangeTodoListTitleAC = ReturnType<typeof changeTodoListTitleAC>
type TodoReducerACType = ChangeTodoListFilterACType | AddNewTodoListACType | RemoveTodoListACType | ChangeTodoListTitleAC

export const todolistID1 = v1()
export const todolistID2 = v1()

const todoLists: TodolistStateType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todoReducer = (state: TodolistStateType[] = todoLists, action: TodoReducerACType): TodolistStateType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filterValue} : tl)
        }
        case "ADD-NEW-TODOLIST": {
            const newTodoList: TodolistStateType = {id: action.payload.todolistId, title: action.payload.nameList, filter: "all"}
            return [newTodoList, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.newTitle} : tl)
        }
        default: {
            return state
        }
    }
}

export const changeTodoListFilterAC = (todolistId: string, filterValue: TodoFilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filterValue
        }
    } as const
}

export const addNewTodoListAC = (todolistId: string, nameList: string) => {
    return {
        type: 'ADD-NEW-TODOLIST',
        payload: {
            todolistId,
            nameList
        }
    } as const
}

export const removeTodoListAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const changeTodoListTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}