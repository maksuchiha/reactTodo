import { v1 } from 'uuid';
import { addNewTaskAC, removeTaskAC, tasksReducer, TasksStateType, TaskStatus, updateTaskAC } from '../tasks-reducer';
import { TaskType } from '../../features/TodoLists/api/types';

let todolistId1: string;
let todolistId2: string;
let startState: TasksStateType;

beforeEach(() => {
	todolistId1 = v1();
	todolistId2 = v1();

	startState = {
		[todolistId1]: [
			{
				addedDate: '',
				deadline: '',
				description: '',
				id: '1',
				order: 0,
				priority: 1,
				startDate: '',
				status: 2,
				title: 'task 1',
				todoListId: todolistId1,
			},
			{
				addedDate: '',
				deadline: '',
				description: '',
				id: '2',
				order: 1,
				priority: 2,
				startDate: '',
				status: 2,
				title: 'task 2',
				todoListId: todolistId1,
			},
			{
				addedDate: '',
				deadline: '',
				description: '',
				id: '3',
				order: 1,
				priority: 3,
				startDate: '',
				status: 3,
				title: 'task 3',
				todoListId: todolistId1,
			},
		],
		[todolistId1]: [
			{
				addedDate: '',
				deadline: '',
				description: '',
				id: '1',
				order: 0,
				priority: 1,
				startDate: '',
				status: 2,
				title: 'task 1',
				todoListId: todolistId2,
			},
			{
				addedDate: '',
				deadline: '',
				description: '',
				id: '2',
				order: 1,
				priority: 2,
				startDate: '',
				status: 2,
				title: 'task 2',
				todoListId: todolistId2,
			},
			{
				addedDate: '',
				deadline: '',
				description: '',
				id: '3',
				order: 1,
				priority: 3,
				startDate: '',
				status: 3,
				title: 'task 3',
				todoListId: todolistId2,
			},
		],
	};
});

test('correct todolist task be added', () => {
	const taskTitle = 'test task';
	const newTask: TaskType = {
		addedDate: '',
		deadline: '',
		description: '',
		id: '5',
		order: 5,
		priority: 4,
		startDate: '',
		status: 0,
		title: taskTitle,
		todoListId: todolistId1,
	};
	const endState = tasksReducer(startState, addNewTaskAC(todolistId1, newTask));
	expect(endState[todolistId1][0].title).toBe(taskTitle);
	expect(endState[todolistId1].length).toBe(4);
});

test('correct todolist task be removed', () => {
	const endState = tasksReducer(startState, removeTaskAC(todolistId1, '1'));
	expect(endState[todolistId1][0].id).toBe('2');
	expect(endState[todolistId1].length).toBe(2);
});

test('correct todolist task be updated', () => {
	const taskTitle = 'test title';
	const taskStatus = TaskStatus.New;
	const updatedTask: TaskType = {
		addedDate: '',
		deadline: '',
		description: '',
		id: '1',
		order: 0,
		priority: 1,
		startDate: '',
		status: taskStatus,
		title: taskTitle,
		todoListId: todolistId1,
	};
	const endState = tasksReducer(startState, updateTaskAC(todolistId1, '1', updatedTask));
	expect(endState[todolistId1][0].id).toBe('1');
	expect(endState[todolistId1].length).toBe(3);
	expect(endState[todolistId1][0].title).toBe(taskTitle);
	expect(endState[todolistId1][0].status).toBe(taskStatus);
});
