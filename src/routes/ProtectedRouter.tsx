import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Paths } from '../paths';

export const ProtectedRouter: FC = () => {
	const isAuth = true;
	return isAuth ? <Outlet /> : <Navigate to={Paths.LOGIN} />;
};
