import s from './header.module.scss'
import Logo from "@/assets/icons/logo.svg";
import { Button } from '@components/ui';
import {NavLink} from "react-router-dom";

type ActiveClassType = {
    isActive: boolean
    isPending: boolean
}

export const Header = () => {
    const navLinkClassName = ({isActive}: ActiveClassType) => isActive ? `${s.nav__link} ${s.nav__link_active}`: s.nav__link

    return (
        <header className={s.header}>
            <div className={`container`}>
                <div className={s.header__inner}>
                    <div className={s.header__left}>
                        <NavLink to="/" className={s.header__logo}>
                            <img src={Logo} alt="logo"/>
                        </NavLink>
                    </div>
                    <div className={s.header__center}>
                        <nav className={s.nav}>
                            <ul className={s.nav__list}>
                                <li className={s.nav__item}>
                                    <NavLink to="/doing" className={navLinkClassName}>
                                        Что делает
                                    </NavLink>
                                </li>
                                <li className="header-nav__item">
                                    <NavLink to="/offers" className={navLinkClassName}>
                                        Сколько стоит
                                    </NavLink>
                                </li>
                                <li className="header-nav__item">
                                    <NavLink to="/how-work" className={navLinkClassName}>
                                        Как работает
                                    </NavLink>
                                </li>
                                <li className="header-nav__item">
                                    <NavLink to="/blog" className={navLinkClassName}>
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
                    <Button onClick={() => {}} title={'Обратная связь'} iconName={'phone'} className={s.feedback}/>

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