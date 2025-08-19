import s from './Login.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginInputs, loginSchema } from '@features/auth/lib/schemas/loginSchema';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType, AppRootState } from '@store/store';
import { ErrorSnackbar } from '@components/ui/ErrorSnackbar';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '@features/auth/api/authApi';
import { ResultCode } from '@features/TodoLists/api/types/enums';
import { setIsLoggedInAC } from '@store/app-slice';
import { AUTH_TOKEN } from '@utils/constants';

export const Login = () => {
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const dispatch = useDispatch<AppDispatchType>();
	const [login] = useLoginMutation();
	const isAuth = useSelector<AppRootState, boolean>((state) => state.ui.isLoggedIn);

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<LoginInputs>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '', rememberMe: false },
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
		// dispatch(loginTC(data));
		login(data).then((res) => {
			if (res.data?.resultCode === ResultCode.Success) {
				dispatch(setIsLoggedInAC({ isLoggedIn: true }));
				localStorage.setItem(AUTH_TOKEN, res.data.data.token);
				reset();
			}
		});
		reset();
	};

	return isAuth ? (
		<Navigate to={from} />
	) : (
		<div className={s.login}>
			<div className={s.modal}>
				<div className={s.modal__title}>Вход</div>
				<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
					<input
						className={s.form__input}
						placeholder={'login'}
						type="text"
						{...register('email', { required: 'Email is required' })}
					/>
					{errors.email && <span className={s.form__error}>{errors.email?.message}</span>}
					<input className={s.form__input} placeholder={'password'} type="text" {...register('password')} />
					{errors.password && <span className={s.form__error}>{errors.password?.message}</span>}
					<label className={s.form__remember}>
						<input type="checkbox" {...register('rememberMe')} />
						<span>Запомнить меня</span>
					</label>
					{errors.rememberMe && <span className={s.form__error}>{errors.rememberMe?.message}</span>}
					<button className={s.form__button}>Войти</button>
				</form>
			</div>
			<ErrorSnackbar />
		</div>
	);
};
