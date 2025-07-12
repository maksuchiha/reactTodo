import { TodoList } from './modules';
import { FC, useCallback } from 'react';
import s from './todolists.module.scss';
import { addNewTodoListTC, changeTodoListTitleTC, removeTodoListTC } from '@store/todo-thunks';
import { updateTaskTC, addNewTaskTC, removeTaskTC } from '@store/tasks-thunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState, AppDispatchType } from '@store/store';
import { AddInput } from '@components/ui/AddInput';
import { TaskStatus } from './api/types/enums';
import { changeTodoListFilterAC } from '../../store/todo-slice';
import { TodoListType } from './api/types';
import { RequestStatus } from '@store/app-slice';

export type TodoFilterType = 'all' | 'completed' | 'progress';
export type TodolistStateType = TodoListType & {
	filter: TodoFilterType;
	entityStatus: RequestStatus;
};

export const TodoLists: FC = () => {
	const todoLists = useSelector<AppRootState, TodolistStateType[]>((state) => state.todoLists);
	const dispatch = useDispatch<AppDispatchType>();

	const changeFilterValue = useCallback(
		(todoListId: string, filterValue: TodoFilterType) => {
			dispatch(changeTodoListFilterAC({ todoListId, filterValue }));
		},
		[dispatch],
	);

	const updateTaskStatus = useCallback(
		(todoListId: string, taskId: string, newStatus: boolean) => {
			const getStatusNumber = newStatus ? TaskStatus.Completed : TaskStatus.New;

			dispatch(updateTaskTC(todoListId, taskId, getStatusNumber));
		},
		[dispatch],
	);

	const removeTask = useCallback(
		(todoListId: string, taskId: string) => {
			dispatch(removeTaskTC(todoListId, taskId));
		},
		[dispatch],
	);

	const addNewTask = useCallback(
		(todoListId: string, newTaskName: string) => {
			dispatch(addNewTaskTC(todoListId, newTaskName));
		},
		[dispatch],
	);

	const addNewTodoList = useCallback(
		(title: string) => {
			dispatch(addNewTodoListTC(title));
		},
		[dispatch],
	);

	const removeTodoList = useCallback(
		(todoListId: string) => {
			dispatch(removeTodoListTC(todoListId));
		},
		[dispatch],
	);

	const changeTaskTitle = useCallback(
		(todoListId: string, taskId: string, newTitle: string) => {
			dispatch(updateTaskTC(todoListId, taskId, newTitle));
		},
		[dispatch],
	);

	const changeTodoListTitle = useCallback(
		(todolistId: string, newTitle: string) => {
			dispatch(changeTodoListTitleTC({ todolistId, newTitle }));
		},
		[dispatch],
	);

	const getTodoLists = todoLists.map((tl) => {
		return (
			<TodoList
				key={tl.id}
				todoListId={tl.id}
				title={tl.title}
				filter={tl.filter}
				changeFilterValue={changeFilterValue}
				removeTask={removeTask}
				addNewTask={addNewTask}
				removeTodoList={removeTodoList}
				changeTaskTitle={changeTaskTitle}
				changeTodoListTitle={changeTodoListTitle}
				updateTaskStatus={updateTaskStatus}
				entityStatus={tl.entityStatus}
			/>
		);
	});

	return (
		<div className={s.todoLists}>
			<div className={s.todoLists__top}>
				<AddInput className={s.addNewTask} addItem={addNewTodoList} placeholder={'Добавить список'} />
			</div>
			<div className={s.todoLists__items}>{getTodoLists}</div>
		</div>
	);
};
