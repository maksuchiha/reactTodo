import s from './todolist.module.scss';
import { FC, memo, useCallback } from 'react';
import { AddInput } from '@components/ui/AddInput';
import { EditSpan } from '../EditSpan';
import { Task } from '../Task';
import { AppDispatchType, AppRootState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppReducerType, RequestStatus } from '@store/app-slice';
import { TodoFilterType } from '@features/TodoLists';
import { useCreateTaskMutation, useGetTasksQuery } from '@features/TodoLists/api/tasks-api';
import { TaskType } from '@features/TodoLists/api/types';
import { TaskStatus } from '@features/TodoLists/api/types/enums';
import { todoListsApi, useDeleteTodoListMutation } from '@features/TodoLists/api/todolists-api';

type TodoListPropsType = {
	todoListId: string;
	title: string;
	filter: TodoFilterType;
	changeFilterValue: (todoListId: string, filterValue: TodoFilterType) => void;
	changeTodoListTitle: (todoListId: string, newTitle: string) => void;
	disabled?: boolean;
};

export const TodoList: FC<TodoListPropsType> = memo(
	({ todoListId, title, filter, changeFilterValue, changeTodoListTitle, disabled }) => {
		const { data: tasks } = useGetTasksQuery(todoListId);
		const entityStatus = useSelector<AppRootState, AppReducerType>((state) => state.ui);
		const [createTask] = useCreateTaskMutation();
		const [deleteTodoList] = useDeleteTodoListMutation();
		const dispatch = useDispatch<AppDispatchType>();

		const tasksForTodoList = tasks?.items ?? [];
		let filteredTasks: TaskType[];

		switch (filter) {
			case 'completed': {
				filteredTasks = tasksForTodoList?.filter((t) => t.status === TaskStatus.Completed);
				break;
			}
			case 'progress': {
				filteredTasks = tasksForTodoList?.filter((t) => t.status === TaskStatus.New);
				break;
			}
			default: {
				filteredTasks = tasksForTodoList;
			}
		}

		const changeTodolistStatus = useCallback(
			(entityStatus: RequestStatus) => {
				dispatch(
					todoListsApi.util.updateQueryData('getTodoLists', undefined, (state) => {
						const todolist = state.find((t) => t.id === todoListId);
						if (todolist) {
							todolist.entityStatus = entityStatus;
						}
					}),
				);
			},
			[dispatch, todoListId], // keep this list minimal but correct
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
				createTask({ todolistId: todoListId, title: newTaskName });
			},
			[todoListId, createTask],
		);

		const removeTodoListHandler = useCallback(() => {
			changeTodolistStatus('loading');
			deleteTodoList(todoListId)
				.unwrap()
				.catch(() => {
					changeTodolistStatus('idle');
				});
		}, [todoListId, deleteTodoList, changeTodolistStatus]);

		const changeTodoListTitleHandler = useCallback(
			(newTitle: string) => {
				changeTodoListTitle(todoListId, newTitle);
			},
			[todoListId, changeTodoListTitle],
		);

		const getTasks =
			filteredTasks.length > 0 ? (
				filteredTasks.map((t) => {
					return <Task key={t.id} todoListId={todoListId} task={t} disabled={entityStatus.status === 'loading'} />;
				})
			) : (
				<p>тасок нет</p>
			);

		return (
			<div className={s.todolist}>
				<div className={s.todolist__title}>
					<EditSpan title={title} changeTitle={changeTodoListTitleHandler} disabled={disabled} />
					<button onClick={removeTodoListHandler} disabled={disabled}>
						x
					</button>
				</div>
				<AddInput
					className={s.addNewTask}
					addItem={addNewTaskHandler}
					placeholder={'Добавить задачу'}
					disabled={disabled}
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
