import s from './ProgressBar.module.scss';
import { useSelector } from 'react-redux';
import { AppRootState } from '@store/store';
import { RequestStatus } from '@store/app-reducer';

export const ProgressBar = () => {
	const status = useSelector<AppRootState, RequestStatus>((state) => state.ui.status);

	return (
		<div className={s.wrapper}>
			<div className={status === 'loading' ? `${s.item} ${s.item_active}` : s.item}></div>
		</div>
	);
};
