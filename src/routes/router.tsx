import { createBrowserRouter } from 'react-router-dom';
import { Paths } from '../paths';
import { App } from '../App';
import { adidasArr, pumaArr } from '@store/localState';
import { HomePage } from '@pages/HomePage';
import { Doing } from '@pages/Doing';
import { Error404 } from '@pages/Error404';
import { ProductPage } from '@pages/ProductPage';

export const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <App />,
			errorElement: <Error404 />,
			children: [
				{
					path: '/',
					element: <HomePage />,
				},
				{
					path: `/${Paths.DOING}`,
					element: <Doing path={Paths.DOING} products={adidasArr} />,
				},
				{
					path: `/${Paths.OFFERS}`,
					element: <Doing path={Paths.OFFERS} products={pumaArr} />,
				},
				{
					path: `/${Paths.PRODUCT_PAGE}`,
					element: <ProductPage products={adidasArr} productId={'productId'} />,
				},
				{
					path: `/${Paths.OFFERS_PAGE}`,
					element: <ProductPage products={pumaArr} productId={'productId'} />,
				},
			],
		},
	],
	{
		basename: '/reactTodo', // базовый путь
	},
);
