import type { Dispatch } from '@reduxjs/toolkit';
import { ResponseType } from '@features/TodoLists/api/types';
import { setAppErrorAC, setAppStatusAC } from '@store/app-slice';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
	if (data.messages.length) {
		dispatch(setAppErrorAC(data.messages[0]));
	} else {
		dispatch(setAppErrorAC('Some error occurred'));
	}
	dispatch(setAppStatusAC('failed'));
};
