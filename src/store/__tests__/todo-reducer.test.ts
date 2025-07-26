import { v1 } from 'uuid';
import {
	changeTodoListFilterAC,
	TodoFilterType,
	TodolistStateType,
	todoListsReducer,
	removeTodoListTC,
	addNewTodoListTC,
	changeTodoListTitleTC,
} from '../todo-slice';

let todolistId1: string;
let todolistId2: string;
let startState: TodolistStateType[];

beforeEach(() => {
	todolistId1 = v1();
	todolistId2 = v1();

	startState = [
		{ id: todolistId1, title: 'What to learn', order: 0, addedDate: new Date(), filter: 'all', entityStatus: 'idle' },
		{ id: todolistId2, title: 'What to buy', order: 0, addedDate: new Date(), filter: 'all', entityStatus: 'idle' },
	];
});

test('correct todolist should be removed', () => {
	const action = removeTodoListTC.fulfilled({ todolistId: todolistId1 }, 'remove todolist id', todolistId1);
	const endState = todoListsReducer(startState, action);
	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
	const newTodoTitle: string = 'test title';
	const newTodo: TodolistStateType = {
		id: todolistId1,
		title: newTodoTitle,
		order: 0,
		addedDate: new Date(),
		filter: 'all',
		entityStatus: 'idle',
	};
	const action = addNewTodoListTC.fulfilled({ todoList: newTodo }, 'add todolist id', newTodoTitle);
	const endState = todoListsReducer(startState, action);
	expect(endState.length).toBe(3);
	expect(endState[0].title).toBe(newTodoTitle);
});

test('correct todolist should be title changed', () => {
	const newTodoTitle: string = 'test title';
	const action = changeTodoListTitleTC.fulfilled(
		{ todolistId: todolistId1, newTitle: newTodoTitle },
		'title changed id', // любой string ID
		{ todolistId: todolistId1, newTitle: newTodoTitle }, // аргументы, переданные в thunk
	);
	const endState = todoListsReducer(startState, action);
	expect(endState.length).toBe(2);
	expect(endState[0].title).toBe(newTodoTitle);
});

test('correct todolist should be filter changed', () => {
	const newFilterValue: TodoFilterType = 'completed';
	const endState = todoListsReducer(
		startState,
		changeTodoListFilterAC({ todoListId: todolistId1, filterValue: newFilterValue }),
	);
	expect(endState.length).toBe(2);
	expect(endState[0].filter).toBe(newFilterValue);
});
