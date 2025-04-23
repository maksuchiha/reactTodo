import { Paths } from '../paths';
import { adidasArr, pumaArr } from '@store/localState';
import { HomePage } from '@pages/HomePage';
import { Doing } from '@pages/Doing';
import { ProductPage } from '@pages/ProductPage';
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
];
