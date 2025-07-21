import { createSlice } from '@reduxjs/toolkit';
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppReducerType = {
	status: RequestStatus;
	error: string | null;
};

const initialState: AppReducerType = {
	status: 'idle' as RequestStatus,
	error: null,
};

export const appSlice = createSlice({
	name: 'app',
	initialState: initialState,
	// reducers состоит из подредьюсеров, эквивалентных одному оператору case в switch
	reducers: (create) => ({
		setAppStatusAC: create.reducer<RequestStatus>((state, action) => {
			state.status = action.payload;
		}),
		setAppErrorAC: create.reducer<string | null>((state, action) => {
			state.error = action.payload;
		}),
	}),
});

// action creator достается из appSlice.actions
export const { setAppStatusAC, setAppErrorAC } = appSlice.actions;

// reducer достается из appSlice.reducer
export const appReducer = appSlice.reducer;
