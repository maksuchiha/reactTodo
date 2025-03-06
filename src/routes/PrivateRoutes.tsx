import { Paths } from '../paths';
import { ProtectPage } from '@pages/ProtectPage';
import { RouteObject } from 'react-router-dom';

export const PrivateRoutes: RouteObject[] = [
	{
		path: `/${Paths.PROTECT_PAGE}`,
		element: <ProtectPage />,
	},
];
