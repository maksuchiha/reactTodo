import { v1 } from 'uuid';
import {
	addNewTodoListAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	removeTodoListAC,
	TodoFilterType,
	TodolistStateType,
	todolistsReducer,
} from '../todo-slice';

let todolistId1: string;
let todolistId2: string;
let startState: TodolistStateType[];

beforeEach(() => {
	todolistId1 = v1();
	todolistId2 = v1();

	startState = [
		{ id: todolistId1, title: 'What to learn', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle' },
		{ id: todolistId2, title: 'What to buy', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle' },
	];
});

test('correct todolist should be removed', () => {
	const endState = todolistsReducer(startState, removeTodoListAC({ todolistId: todolistId1 }));
	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
	const newTodoTitle: string = 'test title';
	const newTodo: TodolistStateType = {
		id: todolistId1,
		title: newTodoTitle,
		order: 0,
		addedDate: '',
		filter: 'all',
		entityStatus: 'idle',
	};
	const endState = todolistsReducer(startState, addNewTodoListAC(newTodo));
	expect(endState.length).toBe(3);
	expect(endState[0].title).toBe(newTodoTitle);
});

test('correct todolist should be title changed', () => {
	const newTodoTitle: string = 'test title';
	const endState = todolistsReducer(
		startState,
		changeTodoListTitleAC({ todolistId: todolistId1, newTitle: newTodoTitle }),
	);
	expect(endState.length).toBe(2);
	expect(endState[0].title).toBe(newTodoTitle);
});

test('correct todolist should be filter changed', () => {
	const newFilterValue: TodoFilterType = 'completed';
	const endState = todolistsReducer(
		startState,
		changeTodoListFilterAC({ todoListId: todolistId1, filterValue: newFilterValue }),
	);
	expect(endState.length).toBe(2);
	expect(endState[0].filter).toBe(newFilterValue);
});
