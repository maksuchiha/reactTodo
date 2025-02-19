export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppStatusACType = ReturnType<typeof setAppStatusAC>;
export type AppErrorACType = ReturnType<typeof setAppErrorAC>;
export type AppReducerACType = AppStatusACType | AppErrorACType;
export type AppReducerType = {
	status: RequestStatus;
	error: string | null;
};

const initialState: AppReducerType = {
	status: 'idle' as RequestStatus,
	error: null,
};

export const appReducer = (state: AppReducerType = initialState, action: AppReducerACType): AppReducerType => {
	switch (action.type) {
		case 'SET-STATUS': {
			return { ...state, status: action.payload.status };
		}
		case 'SET_ERROR': {
			return { ...state, error: action.payload.error };
		}
		default: {
			return state;
		}
	}
};

export const setAppStatusAC = (status: RequestStatus) => {
	return {
		type: 'SET-STATUS',
		payload: {
			status,
		},
	} as const;
};

export const setAppErrorAC = (error: string | null) => {
	return {
		type: 'SET_ERROR',
		payload: { error },
	} as const;
};
