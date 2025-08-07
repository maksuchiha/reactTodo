import { FC, ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Paths } from '../paths';
import { useSelector } from 'react-redux';
import { AppRootState } from '@store/store';

type ProtectedRouterPropsType = {
	element?: ReactNode;
	redirectPath?: string;
};

export const ProtectedRouter: FC<ProtectedRouterPropsType> = ({ element, redirectPath }) => {
	const location = useLocation();
	const isAuth = useSelector<AppRootState, boolean>((state) => state.auth.isLoggedIn);

	if (!isAuth) {
		return <Navigate to={Paths.LOGIN} state={{ from: redirectPath ? redirectPath : location }} replace />;
	}
	return element ? element : <Outlet />;
};
