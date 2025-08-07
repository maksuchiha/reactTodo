import s from './header.module.scss';
import Logo from '@/assets/icons/logo.svg';
import { Button, ProgressBar } from '@components/ui';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../paths';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType, AppRootState } from '@store/store';
import { useNavigate } from 'react-router-dom';
import { logOutTC } from '@features/auth/model/auth-slice';

type ActiveClassType = {
	isActive: boolean;
	isPending: boolean;
};

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatchType>();
	const isAuth = useSelector<AppRootState, boolean>((state) => state.auth.isLoggedIn);

	const navLinkClassName = ({ isActive }: ActiveClassType) =>
		isActive ? `${s.nav__link} ${s.nav__link_active}` : s.nav__link;

	const routeToLogin = () => {
		navigate(Paths.LOGIN);
	};

	const logout = () => {
		dispatch(logOutTC());
	};

	return (
		<header className={s.header}>
			<ProgressBar />
			<div className={`container`}>
				<div className={s.header__inner}>
					<div className={s.header__left}>
						<NavLink to="/" className={s.header__logo}>
							<img src={Logo} alt="logo" />
						</NavLink>
					</div>
					<div className={s.header__center}>
						<nav className={s.nav}>
							<ul className={s.nav__list}>
								<li className={s.nav__item}>
									<NavLink to={Paths.DOING} className={navLinkClassName}>
										Что делает
									</NavLink>
								</li>
								<li className="header-nav__item">
									<NavLink to={Paths.OFFERS} className={navLinkClassName}>
										Сколько стоит
									</NavLink>
								</li>
								<li className="header-nav__item">
									<NavLink to={Paths.PROTECT_PAGE} className={navLinkClassName}>
										Как работает
									</NavLink>
								</li>
								<li className="header-nav__item">
									<NavLink to={Paths.FAQ} className={navLinkClassName}>
										Блог
									</NavLink>
								</li>
								<li className="header-nav__item">
									<NavLink to="/video" className={navLinkClassName}>
										Видео
									</NavLink>
								</li>
								<li className="header-nav__item">
									<NavLink to="/club" className={navLinkClassName}>
										Клуб
									</NavLink>
								</li>
							</ul>
						</nav>
					</div>
					{/*<Button onClick={() => {}} title={'Обратная связь'} iconName={'phone'} className={s.feedback} />*/}
					{isAuth ? (
						<Button onClick={logout} title={'Выйти'} className={s.feedback} />
					) : (
						<Button onClick={routeToLogin} title={'Войти'} className={s.feedback} />
					)}

					<button className={s.burger} aria-label="Мобильное меню">
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
			</div>
		</header>
	);
};
