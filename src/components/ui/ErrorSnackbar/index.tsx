import { Snackbar } from '@components/ui/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState, AppDispatchType } from '@store/store';
import { AppReducerType, setAppErrorAC } from '@store/app-slice';

export const ErrorSnackbar = () => {
	const curError = useSelector<AppRootState, AppReducerType>((state) => state.ui);
	const dispatch = useDispatch<AppDispatchType>();

	const changeStatusHandler = (newStatus: null) => {
		dispatch(setAppErrorAC(newStatus));
	};

	return (
		<Snackbar
			open={curError.error}
			changeStatus={changeStatusHandler}
			autoHideDuration={3000}
			message={curError.error}
			action={'Error'}
		/>
	);
};
