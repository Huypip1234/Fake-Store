import axios from 'axios';
// Interface
import { IDataLogin, IDataSignUp } from '../interface';

const BASE_URL = 'https://fakestoreapi.com';

const baseUrl = axios.create({
    /* headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }, */
    baseURL: BASE_URL,
});

export const logIn = async (dataLogin: IDataLogin) => {
    const res = await baseUrl.post('/auth/login', dataLogin);
    return res;
}

export const signUp = async (dataSignUp: IDataSignUp) => {
    const res = await baseUrl.post('/users', dataSignUp);
    return res;
}

export const getAllProduct = async () => {
    const res = await baseUrl.get('/products');
    return res;
}

export const getSortedProduct = async (increaseOrDecreas: string) => {
    const res = await baseUrl.get(`/products?sort=${increaseOrDecreas}`);
    return res;
}

export const getProductInCategories = async (category: string) => {
    const res = await baseUrl.get(`/products/category/${category}`);
    return res;
}

export const getAllUser = async () => {
    const res = await baseUrl.get('/users');
    return res;
}

export const getUserShoppingCartData = async (userID: number) => {
    const res = await baseUrl.get(`/carts/${userID}`);
    return res;
}

export const deleteProductOfCart = async (id: number) => {
    const res = await baseUrl.delete(`/products/${id}`)
    return res
}

export const addProductOfCart = async (id: number) => {
    const res = await baseUrl.post(`/products`, id)
    return res
}