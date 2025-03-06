import { ChangeEvent, FC, KeyboardEvent, memo, useCallback, useEffect, useState } from 'react';
import s from './AddInput.module.scss';

type AddInputPropsType = {
	placeholder: string;
	className?: string;
	addItem: (value: string) => void;
	disabled?: boolean;
};

export const AddInput: FC<AddInputPropsType> = memo(({ className, placeholder, addItem, disabled }) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [error, setError] = useState<boolean>(false);

	const inputOnChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.currentTarget.value);
			if (error) {
				setError(false);
			}
		},
		[error],
	);

	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				setError(false);
			}, 1000);

			// Очищаем таймер при размонтировании или изменении ошибки
			return () => clearTimeout(timer);
		}
	}, [error]);

	const addTask = useCallback(() => {
		if (inputValue.trim().length > 0) {
			addItem(inputValue);
			setInputValue('');
		} else {
			setError(true);
		}
	}, [inputValue, addItem]);

	const inputOnKeyDownHandler = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				addTask();
			}
		},
		[addTask],
	);

	const buttonOnClickHandler = useCallback(() => {
		addTask();
	}, [addTask]);

	return (
		<div className={className ? `${s.addInput} ${className}` : s.addInput}>
			<input
				value={inputValue}
				onChange={inputOnChangeHandler}
				onKeyDown={inputOnKeyDownHandler}
				placeholder={placeholder}
				type={'text'}
				disabled={disabled}
			/>
			<button onClick={buttonOnClickHandler} disabled={disabled}>
				+
			</button>
			{error && <div className={s.error}>Введите корректное значение</div>}
		</div>
	);
});
