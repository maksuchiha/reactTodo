import { Outlet } from 'react-router-dom';
import { Header } from '@components/layouts/Header';
import { Footer } from '@components/layouts/Footer';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodoListsTC } from '@store/todo-reducer';
import { AppDispatch } from '@store/store';
import { ErrorSnackbar } from './components/ui/ErrorSnackbar';

export const App = () => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(fetchTodoListsTC());
	}, [dispatch]);
	return (
		<>
			<Header />
			<main>
				<div className="container">
					{/*<Routes>*/}
					{/*	<Route path={'/'} element={<HomePage />} />*/}
					{/*	<Route path={Paths.DOING} element={<Doing path={Paths.DOING} products={adidasArr} />} />*/}
					{/*	<Route path={Paths.OFFERS} element={<Doing path={Paths.OFFERS} products={pumaArr} />} />*/}
					{/*	<Route path={Paths.PRODUCT_PAGE} element={<ProductPage products={adidasArr} productId={'productId'} />} />*/}
					{/*	<Route path={Paths.OFFERS_PAGE} element={<ProductPage products={pumaArr} productId={'productId'} />} />*/}
					{/*	<Route path={Paths.ERROR404} element={<Error404 />} />*/}
					{/*	<Route path={'/*'} element={<Navigate to={Paths.ERROR404} />} />*/}
					{/*</Routes>*/}
					<Outlet />
				</div>
			</main>
			<Footer />
			<ErrorSnackbar />
		</>
	);
};
