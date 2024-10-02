import {FC} from 'react';
import s from './button.module.scss';
import {Icon} from "../Icon";

type ButtonPropsType = {
    title: string
    onClick: () => void
    className?: string
    iconName?: string
    type?: "blue"
}

export const Button:FC<ButtonPropsType> = ({title, className = '', onClick, iconName, type = ''}) => {
    let typeBtn

    switch (type) {
        case "blue": {
            typeBtn = s.button_blue
            break
        }
        default: {
            typeBtn = ''
            break
        }
    }
    return (
        <button className={`${s.button} ${typeBtn} ${className}`} onClick={onClick}>
            {iconName && <span className={s.button__icon}><Icon iconName={iconName}/></span>}
            <span className={s.button__content}>{title}</span>
        </button>
    );
}