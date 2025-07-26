import { Outlet } from 'react-router-dom';
import { Header } from '@components/layouts/Header';
import { Footer } from '@components/layouts/Footer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorSnackbar } from '@components/ui/ErrorSnackbar';
import { AppDispatchType } from '@store/store';
import { initializeAppTC } from '@features/auth/model/auth-slice';
import { Preloader } from '@components/ui';

export const App = () => {
	const [isInitialized, setIsInitialized] = useState(false);
	const dispatch = useDispatch<AppDispatchType>();
	useEffect(() => {
		dispatch(initializeAppTC()).finally(() => {
			setIsInitialized(true);
		});
	}, [dispatch]);
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
