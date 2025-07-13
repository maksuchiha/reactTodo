import { v1 } from 'uuid';
import { addNewTaskTC, removeTaskTC, tasksReducer, TasksStateType, updateTaskTC } from '../tasks-slice';
import { TaskType, UpdateTaskModel } from '@features/TodoLists/api/types';
import { TaskStatus } from '@features/TodoLists/api/types/enums';

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
	const action = addNewTaskTC.fulfilled({ todolistId: todolistId1, newTask }, '', {
		todolistId: todolistId1,
		title: taskTitle,
	});
	const endState = tasksReducer(startState, action);
	expect(endState[todolistId1][0].title).toBe(taskTitle);
	expect(endState[todolistId1].length).toBe(4);
});

test('correct todolist task be removed', () => {
	const action = removeTaskTC.fulfilled({ todolistId: todolistId1, taskId: '1' }, 'task removed id', {
		todolistId: todolistId1,
		taskId: '1',
	});
	const endState = tasksReducer(startState, action);
	expect(endState[todolistId1][0].id).toBe('2');
	expect(endState[todolistId1].length).toBe(2);
});

test('correct todolist task be updated', () => {
	// Только поля, которые реально были изменены
	const updatedFields: Partial<UpdateTaskModel> = {
		title: 'test title',
		status: TaskStatus.New,
	};

	const action = updateTaskTC.fulfilled({ todolistId: todolistId1, taskId: '1', updatedFields }, 'requestId', {
		todolistId: todolistId1,
		taskId: '1',
		domainModel: updatedFields,
	});

	const endState = tasksReducer(startState, action);

	expect(endState[todolistId1][0].id).toBe('1');
	expect(endState[todolistId1].length).toBe(3);
	expect(endState[todolistId1][0].title).toBe(updatedFields.title);
	expect(endState[todolistId1][0].status).toBe(updatedFields.status);
});
