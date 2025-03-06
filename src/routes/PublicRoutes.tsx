import { Paths } from '../paths';
import { adidasArr, pumaArr } from '@store/localState';
import { HomePage } from '@pages/HomePage';
import { Doing } from '@pages/Doing';
import { ProductPage } from '@pages/ProductPage';
import { Error404 } from '@pages/Error404';
import { Login } from '@pages/Login';
import { RouteObject } from 'react-router-dom';

export const PublicRoutes: RouteObject[] = [
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
	{
		path: `/${Paths.LOGIN}`,
		element: <Login />,
	},
	{
		path: `/${Paths.ERROR404}`,
		element: <Error404 />,
	},
];
