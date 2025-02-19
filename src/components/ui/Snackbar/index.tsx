import s from './Snackbar.module.scss';
import { CrossIcon } from '@assets/icons';
import { FC, useCallback, useEffect } from 'react';

type SnackbarActionType = 'Error' | 'Alert';

type SnackbarPropsType = {
	open: string | null;
	autoHideDuration: number;
	changeStatus: (newStatus: null) => void;
	message: string | null;
	action?: SnackbarActionType;
};

export const Snackbar: FC<SnackbarPropsType> = ({
	open,
	autoHideDuration,
	changeStatus,
	message = 'error',
	action,
}) => {
	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | undefined;
		if (open) {
			timeout = setTimeout(snackbarCloseHandler, autoHideDuration);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [open]);

	const snackbarCloseHandler = useCallback(() => {
		changeStatus(null);
	}, []);

	const getSnackbarAction = () => {
		switch (action) {
			case 'Alert': {
				return s.wrapper_alert;
			}
			case 'Error': {
				return s.wrapper_error;
			}
			default: {
				return '';
			}
		}
	};

	return (
		open && (
			<div className={`${s.wrapper} ${getSnackbarAction()}`}>
				<div className={s.message}>{message}</div>
				<button className={s.close} onClick={snackbarCloseHandler}>
					<CrossIcon color={'white'} />
				</button>
			</div>
		)
	);
};
