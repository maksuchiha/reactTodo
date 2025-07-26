import type { Dispatch } from '@reduxjs/toolkit';
import { setAppErrorAC, setAppStatusAC } from '@store/app-slice';
import { BaseResponse } from '@globalTypes/response.types';

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
	if (data.messages.length) {
		dispatch(setAppErrorAC(data.messages[0]));
	} else {
		dispatch(setAppErrorAC('Some error occurred'));
	}
	dispatch(setAppStatusAC('failed'));
};
