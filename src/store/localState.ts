import { v1 } from 'uuid';
import phone from '../assets/images/phone.png';

export type ProductDataType = {
	id: string;
	model: string;
	collection: string;
	price: string;
	picture: string;
};

export const adidasArr: ProductDataType[] = [
	{
		id: v1(),
		model: 'ADIDAS ADIFOM TRXN',
		collection: 'new collection1',
		price: '100200$',
		picture: phone,
	},
	{
		id: v1(),
		model: 'ADIDAS ADIFOM SUPER',
		collection: 'new collection22',
		price: '200300$',
		picture: phone,
	},
	{
		id: v1(),
		model: 'ADIDAS SUPER SUPERSKI',
		collection: 'new collection333',
		price: '300400$',
		picture: phone,
	},
];
export const pumaArr: ProductDataType[] = [
	{
		id: v1(),
		model: '321 ADIFOM TRXN',
		collection: 'new collection1',
		price: '1000$',
		picture: phone,
	},
	{
		id: v1(),
		model: '321 ADIFOM SUPER',
		collection: 'new 444',
		price: '200$',
		picture: phone,
	},
	{
		id: v1(),
		model: '123 SUPER SUPERSKI',
		collection: 'new 444',
		price: '30$',
		picture: phone,
	},
];
