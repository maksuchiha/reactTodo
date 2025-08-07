import { createAppSlice } from '@utils/thunks';
import { LoginInputs } from '@features/auth/lib/schemas/loginSchema';
import { authApi } from '@features/auth/api/authApi';
import { handleServerNetworkError } from '@utils/serverResponse/handleServerNetworkError';
import { setAppStatusAC } from '@store/app-slice';
import { ResultCode } from '@features/TodoLists/api/types/enums';
import { handleServerAppError } from '@utils/serverResponse/handleServerAppError';
import { AUTH_TOKEN } from '../../../constants';

export const authSlice = createAppSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
	},
	reducers: (create) => ({
		initializeAppTC: create.asyncThunk(
			async (_, { dispatch, rejectWithValue }) => {
				try {
					dispatch(setAppStatusAC('loading'));
					const res = await authApi.me();
					if (res.data.resultCode === ResultCode.Success) {
						dispatch(setAppStatusAC('succeeded'));
						return { isLoggedIn: true };
					} else {
						handleServerAppError(res.data, dispatch);
						return rejectWithValue(null);
					}
				} catch (error: unknown) {
					handleServerNetworkError(error, dispatch);
					return rejectWithValue(null);
				}
			},
			{
				fulfilled: (state, action) => {
					state.isLoggedIn = action.payload.isLoggedIn;
				},
			},
		),
		loginTC: create.asyncThunk(
			async (data: LoginInputs, { dispatch, rejectWithValue }) => {
				// логика санки для авторизации
				dispatch(setAppStatusAC('loading'));
				try {
					const res = await authApi.login(data);
					// "97233bad-704d-4f3b-a5c4-594014a1e316"
					// 27367
					if (res.data.resultCode === ResultCode.Success) {
						dispatch(setAppStatusAC('succeeded'));
						localStorage.setItem(AUTH_TOKEN, res.data.data.token);
						return { isLoggedIn: true };
					} else {
						handleServerAppError(res.data, dispatch);
						return rejectWithValue(`login error`);
					}
				} catch (error) {
					handleServerNetworkError(error, dispatch);
					return rejectWithValue(`login error`);
				}
			},
			{
				fulfilled: (state, action) => {
					state.isLoggedIn = action.payload.isLoggedIn;
				},
			},
		),
		logOutTC: create.asyncThunk(
			async (_, { dispatch, rejectWithValue }) => {
				// логика санки для авторизации
				dispatch(setAppStatusAC('loading'));
				try {
					const res = await authApi.logOut();
					if (res.data.resultCode === ResultCode.Success) {
						dispatch(setAppStatusAC('succeeded'));
						localStorage.removeItem(AUTH_TOKEN);
						return { isLoggedIn: false };
					} else {
						handleServerAppError(res.data, dispatch);
						return rejectWithValue(`logout error`);
					}
				} catch (error) {
					handleServerNetworkError(error, dispatch);
					return rejectWithValue(`logout error`);
				}
			},
			{
				fulfilled: (state, action) => {
					state.isLoggedIn = action.payload.isLoggedIn;
				},
			},
		),
	}),
	selectors: {
		selectIsLoggedIn: (state) => state.isLoggedIn,
	},
});

export const { selectIsLoggedIn } = authSlice.selectors;
export const { loginTC, initializeAppTC, logOutTC } = authSlice.actions;
export const authReducer = authSlice.reducer;
