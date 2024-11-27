import { NavLink } from 'react-router-dom';
import { FC } from 'react';
import { ProductDataType } from '@store/localState';

type DoingPropsType = {
	path: string;
	products: ProductDataType[];
};

export const Doing: FC<DoingPropsType> = ({ path, products }) => {
	const outLinks = products.map((product) => {
		return (
			<NavLink key={product.id} to={`${path}/${product.id}`}>
				{product.model}
			</NavLink>
		);
	});

	return <>{outLinks}</>;
};
