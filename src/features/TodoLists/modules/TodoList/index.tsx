import s from './todolist.module.scss';
import { FC, memo, useCallback, useEffect } from 'react';
import { TasksStateType, fetchTasksTC } from '@store/tasks-thunks';
import { AddInput } from '@components/ui/AddInput';
import { EditSpan } from '../EditSpan';
import { Task } from '../Task';
import { AppRootState, AppDispatchType } from '@store/store';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { TaskType } from '../../api/types';
import { RequestStatus } from '@store/app-slice';
import { TaskStatus } from '../../api/types/enums';
import { TodoFilterType } from '@features/TodoLists';

type TodoListPropsType = {
	todoListId: string;
	title: string;
	filter: TodoFilterType;
	changeFilterValue: (todoListId: string, filterValue: TodoFilterType) => void;
	removeTask: (todoListId: string, taskId: string) => void;
	addNewTask: (todoListId: string, newTaskName: string) => void;
	removeTodoList: (todoListId: string) => void;
	changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void;
	changeTodoListTitle: (todoListId: string, newTitle: string) => void;
	updateTaskStatus: (todoListId: string, taskId: string, newStatus: boolean) => void;
	entityStatus: RequestStatus;
};

export const TodoList: FC<TodoListPropsType> = memo(
	({
		todoListId,
		title,
		filter,
		changeFilterValue,
		removeTask,
		addNewTask,
		removeTodoList,
		changeTaskTitle,
		changeTodoListTitle,
		updateTaskStatus,
		entityStatus,
	}) => {
		const getTasksState = (state: AppRootState): TasksStateType => state.todoTasks;

		const selectTasksForTodoList = createSelector(
			[getTasksState, (_: AppRootState, todoListId: string) => todoListId],
			(tasks, todoListId) => tasks[todoListId] || [],
		);

		const tasksForTodoList = useSelector((state: AppRootState) => selectTasksForTodoList(state, todoListId));

		const dispatch = useDispatch<AppDispatchType>();

		useEffect(() => {
			dispatch(fetchTasksTC(todoListId));
		}, [todoListId, dispatch]);

		let filteredTasks: TaskType[];

		switch (filter) {
			case 'completed': {
				filteredTasks = tasksForTodoList.filter((t) => t.status === TaskStatus.Completed);
				break;
			}
			case 'progress': {
				filteredTasks = tasksForTodoList.filter((t) => t.status === TaskStatus.New);
				break;
			}
			default: {
				filteredTasks = tasksForTodoList;
			}
		}

		const updateTaskStatusHandler = useCallback(
			(taskId: string, newStatus: boolean) => {
				updateTaskStatus(todoListId, taskId, newStatus);
			},
			[todoListId, updateTaskStatus],
		);

		const removeTaskHandler = useCallback(
			(taskId: string) => {
				removeTask(todoListId, taskId);
			},
			[todoListId, removeTask],
		);

		const getFilterStatus = useCallback(
			(status: string) => {
				return filter === status ? `${s.filter__item} ${s.filter__item_active}` : `${s.filter__item}`;
			},
			[filter],
		);

		const changeFilterHandler = useCallback(
			(filterValue: TodoFilterType) => {
				changeFilterValue(todoListId, filterValue);
			},
			[todoListId, changeFilterValue],
		);

		const addNewTaskHandler = useCallback(
			(newTaskName: string) => {
				addNewTask(todoListId, newTaskName);
			},
			[todoListId, addNewTask],
		);

		const removeTodoListHandler = useCallback(() => {
			removeTodoList(todoListId);
		}, [todoListId, removeTodoList]);

		const changeTaskTitleHandler = useCallback(
			(taskId: string, newTitle: string) => {
				changeTaskTitle(todoListId, taskId, newTitle);
			},
			[todoListId, changeTaskTitle],
		);

		const changeTodoListTitleHandler = useCallback(
			(newTitle: string) => {
				changeTodoListTitle(todoListId, newTitle);
			},
			[todoListId, changeTodoListTitle],
		);

		const getTasks =
			filteredTasks.length > 0 ? (
				filteredTasks.map((t) => {
					return (
						<Task
							key={t.id}
							taskId={t.id}
							title={t.title}
							completed={t.status === TaskStatus.Completed}
							updateTaskStatus={updateTaskStatusHandler}
							changeTaskTitle={changeTaskTitleHandler}
							removeTask={removeTaskHandler}
							disabled={entityStatus === 'loading'}
						/>
					);
				})
			) : (
				<p>тасок нет</p>
			);

		return (
			<div className={s.todolist}>
				<div className={s.todolist__title}>
					<EditSpan title={title} changeTitle={changeTodoListTitleHandler} disabled={entityStatus === 'loading'} />
					<button onClick={removeTodoListHandler} disabled={entityStatus === 'loading'}>
						x
					</button>
				</div>
				<AddInput
					className={s.addNewTask}
					addItem={addNewTaskHandler}
					placeholder={'Добавить задачу'}
					disabled={entityStatus === 'loading'}
				/>
				<ul className={s.tasks}>{getTasks}</ul>
				<div className={s.filter}>
					<button className={getFilterStatus('all')} onClick={() => changeFilterHandler('all')}>
						all
					</button>
					<button className={getFilterStatus('completed')} onClick={() => changeFilterHandler('completed')}>
						completed
					</button>
					<button className={getFilterStatus('progress')} onClick={() => changeFilterHandler('progress')}>
						In progress
					</button>
				</div>
			</div>
		);
	},
);
