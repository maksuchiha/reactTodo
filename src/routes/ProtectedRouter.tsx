import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Paths } from '../paths';
import { useSelector } from 'react-redux';
import { AppRootState } from '@store/store';

export const ProtectedRouter: FC = () => {
	const location = useLocation();
	const isAuth = useSelector<AppRootState, boolean>((state) => state.auth.isLoggedIn);
	return isAuth ? <Outlet /> : <Navigate to={Paths.LOGIN} state={{ from: location }} replace />;
};
