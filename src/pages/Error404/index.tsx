import s from './Error404.module.scss';
import { NavLink } from 'react-router-dom';

export const Error404 = () => {
	return (
		<div className={s.error404}>
			<div className={s.error404__wrapper}>
				<div className={s.error404__text}>404</div>
				<NavLink to={'/'} className={s.error404__link}>
					go main page
				</NavLink>
			</div>
		</div>
	);
};
