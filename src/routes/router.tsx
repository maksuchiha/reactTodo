import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Paths } from '../paths';
import { App } from '../App';
import { PrivateRoutes } from './PrivateRoutes';
import { ProtectedRouter } from './ProtectedRouter';
import { PublicRoutes } from './PublicRoutes';
import { Login } from '@pages/Login';
import { Error404 } from '@pages/Error404';

export const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <App />,
			errorElement: <Navigate to={Paths.ERROR404} />,
			children: [
				{
					element: <ProtectedRouter />,
					children: PrivateRoutes,
				},
				...PublicRoutes,
			],
		},
		{
			path: `/${Paths.LOGIN}`,
			element: <Login />,
		},
		{
			path: `/${Paths.ERROR404}`,
			element: <Error404 />,
		},
	],
	{
		basename: '/reactTodo',
		future: {
			v7_startTransition: true,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any,
	},
);
