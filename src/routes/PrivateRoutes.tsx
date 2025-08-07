import { Paths } from '../paths';
import { RouteObject } from 'react-router-dom';
import { TodoLists } from '@features/TodoLists';
import { Faq } from '@pages/Faq';
import { ProtectedRouter } from './ProtectedRouter';

export const PrivateRoutes: RouteObject[] = [
	{
		path: `/${Paths.PROTECT_PAGE}`,
		element: <ProtectedRouter element={<TodoLists />} />,
	},
	{
		path: `/${Paths.FAQ}`,
		element: <ProtectedRouter element={<Faq />} />,
	},
];
