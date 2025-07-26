export type BaseResponse<T = object> = {
	data: T;
	fieldErrors: string[];
	messages: string[];
	resultCode: number;
};
