export type ResponseType<T = object> = {
	data: T;
	fieldErrors: string[];
	messages: string[];
	resultCode: number;
};
