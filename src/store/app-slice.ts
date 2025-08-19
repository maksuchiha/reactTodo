import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { tasksApi } from '@features/TodoLists/api/tasks-api';
import { todoListsApi } from '@features/TodoLists/api/todolists-api';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppReducerType = {
	status: RequestStatus;
	error: string | null;
	isLoggedIn: boolean;
};

const initialState: AppReducerType = {
	status: 'idle' as RequestStatus,
	error: null,
	isLoggedIn: false,
};

export const appSlice = createSlice({
	name: 'ui',
	initialState: initialState,
	// reducers состоит из подредьюсеров, эквивалентных одному оператору case в switch
	reducers: (create) => ({
		setAppErrorAC: create.reducer<string | null>((state, action) => {
			state.error = action.payload;
		}),
		setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn;
		}),
	}),
	extraReducers: (builder) => {
		builder
			.addMatcher(isPending, (state, action) => {
				if (
					todoListsApi.endpoints.getTodoLists.matchPending(action) ||
					tasksApi.endpoints.getTasks.matchPending(action)
				) {
					return;
				}
				state.status = 'loading';
			})
			.addMatcher(isFulfilled, (state) => {
				state.status = 'failed';
			})
			.addMatcher(isRejected, (state) => {
				state.status = 'failed';
			});
	},
});

// action creator достается из appSlice.actions
export const { setAppErrorAC, setIsLoggedInAC } = appSlice.actions;
