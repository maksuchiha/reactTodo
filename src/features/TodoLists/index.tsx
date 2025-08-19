import { TodoList } from './modules';
import { FC, useCallback } from 'react';
import s from './todolists.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '@store/store';
import { AddInput } from '@components/ui/AddInput';

import {
	todoListsApi,
	useCreateTodoListMutation,
	useGetTodoListsQuery,
	useUpdateTodoListTitleMutation,
} from '@features/TodoLists/api/todolists-api';
export type TodoFilterType = 'all' | 'completed' | 'progress';

export const TodoLists: FC = () => {
	const { data: todoLists, isLoading } = useGetTodoListsQuery();
	const [createTodoList] = useCreateTodoListMutation();
	const [updateTodoListTitle] = useUpdateTodoListTitleMutation();

	const dispatch = useDispatch<AppDispatchType>();

	const changeFilterValue = useCallback(
		(todoListId: string, filterValue: TodoFilterType) => {
			dispatch(
				todoListsApi.util.updateQueryData(
					// название эндпоинта, в котором нужно обновить кэш
					'getTodoLists',
					// аргументы для эндпоинта
					undefined,
					// `updateRecipe` - коллбэк для обновления закэшированного стейта мутабельным образом
					(state) => {
						const todolist = state.find((todolist) => todolist.id === todoListId);
						if (todolist) {
							todolist.filter = filterValue;
						}
					},
				),
			);
		},
		[dispatch],
	);

	const addNewTodoList = useCallback(
		(title: string) => {
			createTodoList(title);
		},
		[createTodoList],
	);

	const changeTodoListTitle = useCallback(
		(todolistId: string, newTitle: string) => {
			updateTodoListTitle({ id: todolistId, title: newTitle });
		},
		[updateTodoListTitle],
	);

	const getTodoLists = todoLists?.map((tl) => {
		return (
			<TodoList
				key={tl.id}
				todoListId={tl.id}
				title={tl.title}
				filter={tl.filter}
				changeFilterValue={changeFilterValue}
				changeTodoListTitle={changeTodoListTitle}
				disabled={tl.entityStatus === 'loading'}
			/>
		);
	});

	const getSkeletons = Array(3)
		.fill(null)
		.map((_, index) => <div key={index}>skeleton</div>);

	return (
		<div className={s.todoLists}>
			<div className={s.todoLists__top}>
				<AddInput className={s.addNewTask} addItem={addNewTodoList} placeholder={'Добавить список'} />
			</div>
			<div className={s.todoLists__items}>{isLoading ? getSkeletons : getTodoLists}</div>
		</div>
	);
};
