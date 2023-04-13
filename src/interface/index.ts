export interface IDataLogin {
	username: string
	password: string
	remember: boolean
}

export interface IDataSignUp {
	username: string
	password: string
	email: string
}

export interface IBillData {
	productData: {
		id: number;
		img: string;
		title: string;
		quantity: number;
		price: number;
		size: string;
	}[];
	total: number;
}

export interface IAllState {
	isLoading: boolean
	pageSlice: IAllProductData[][]
	productListFilter: IAllProductData[]
	userInforData: IUserInforData
	totalAllProductPrice: number
	cartData: ICartData[]
	allProductDataImmutation: IAllProductData[]
	billDataCart: string | number | IBillData
}

export interface IAllProductData {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
	rating: { rate: number, count: number }
}

export interface ICartData {
	productData: IAllProductData;
	quantity: number;
}

export interface IUserInforData {
	id: number
	email: string
	username: string
	password: string
	name: {
		firstname: string
		lastname: string
	},
	address: {
		city: string
		street: string
		number: number
		zipcode: string
		geolocation: {
			lat: string
			long: string
		}
	},
	phone: string
}
