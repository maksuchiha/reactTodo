import s from './Login.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema } from '@features/auth/lib/schemas';
import { z } from 'zod';

type Inputs = z.infer<typeof loginSchema>;

export const Login = () => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '', rememberMe: false },
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		reset();
	};

	return (
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
		</div>
	);
};
