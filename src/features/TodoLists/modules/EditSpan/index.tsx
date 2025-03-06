import { ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState } from 'react';

type EditSpanPropsType = {
	title: string;
	changeTitle: (newTitle: string) => void;
	disabled?: boolean;
};

export const EditSpan: FC<EditSpanPropsType> = memo(({ title, changeTitle, disabled }) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [newTitle, setNewTitle] = useState(title);

	const onDoubleClickHandler = useCallback(() => {
		if (disabled) return;

		setEdit(true);
	}, [disabled]);

	const onChangeInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value);
	}, []);

	const confirmChanges = useCallback(() => {
		setEdit(false);
		changeTitle(newTitle);
		if (newTitle.length >= 100) {
			setNewTitle(title);
		}
	}, [title, newTitle, changeTitle]);

	const onBlurInputHandler = useCallback(() => {
		confirmChanges();
	}, [confirmChanges]);

	const onKeyDownInputHandler = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				confirmChanges();
			}
		},
		[confirmChanges],
	);

	return edit ? (
		<input
			autoFocus
			value={newTitle}
			onKeyDown={onKeyDownInputHandler}
			onBlur={onBlurInputHandler}
			onChange={onChangeInputHandler}
			type={'text'}
		/>
	) : (
		<span onDoubleClick={onDoubleClickHandler}>{newTitle}</span>
	);
});
