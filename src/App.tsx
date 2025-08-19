import { Outlet } from 'react-router-dom';
import { Header } from '@components/layouts/Header';
import { Footer } from '@components/layouts/Footer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorSnackbar } from '@components/ui/ErrorSnackbar';
import { AppDispatchType } from '@store/store';
import { Preloader } from '@components/ui';
import { useMeQuery } from '@features/auth/api/authApi';
import { ResultCode } from '@features/TodoLists/api/types/enums';
import { setIsLoggedInAC } from '@store/app-slice';

export const App = () => {
	const [isInitialized, setIsInitialized] = useState(false);
	const dispatch = useDispatch<AppDispatchType>();
	const { data, isLoading } = useMeQuery();
	useEffect(() => {
		if (isLoading) return;
		setIsInitialized(true);
		if (data?.resultCode === ResultCode.Success) {
			dispatch(setIsLoggedInAC({ isLoggedIn: true }));
		}
	}, [isLoading, data?.resultCode, dispatch]);
	return !isInitialized ? (
		<Preloader />
	) : (
		<>
			<Header />
			<main>
				<div className="container">
					<Outlet />
				</div>
			</main>
			<Footer />
			<ErrorSnackbar />
		</>
	);
};
