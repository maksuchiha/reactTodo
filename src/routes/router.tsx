import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Paths } from '../paths';
import { App } from '../App';
import { PrivateRoutes } from './PrivateRoutes';
import { ProtectedRouter } from './ProtectedRouter';
import { PublicRoutes } from './PublicRoutes';

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
	],
	{
		basename: '/reactTodo', // базовый путь
		future: {
			v7_startTransition: true,
		},
	},
);
