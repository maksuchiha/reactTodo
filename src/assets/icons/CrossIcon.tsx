import { FC } from 'react';
import { IconPropsType } from './icon-types';
import s from './IconStyles.module.scss';

export const CrossIcon: FC<IconPropsType> = ({ color }) => {
	return (
		<svg className={s.icon} viewBox="0 0 24 24">
			<path
				fill={color}
				d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
			></path>
		</svg>
	);
};
