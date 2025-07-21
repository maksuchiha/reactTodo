import type { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAppErrorAC, setAppStatusAC } from '@store/app-slice';

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
	let errorMessage;

	if (axios.isAxiosError(error)) {
		errorMessage = error.response?.data?.message || error.message;
	} else if (error instanceof Error) {
		errorMessage = `Native error: ${error.message}`;
	} else {
		errorMessage = JSON.stringify(error);
	}

	dispatch(setAppErrorAC(errorMessage));
	dispatch(setAppStatusAC('failed'));
};
