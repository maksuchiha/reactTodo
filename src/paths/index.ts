export const Paths = {
	DOING: '/doing',
	OFFERS: '/offers',
	get PRODUCT_PAGE() {
		return `${this.DOING}/:productId`;
	},
	get OFFERS_PAGE() {
		return `${this.OFFERS}/:productId`;
	},
	PROTECT_PAGE: '/protect',
	LOGIN: '/login',
	ERROR404: '/error404',
} as const;
