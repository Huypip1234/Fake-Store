import { IAllProductData, IBillData, ICartData, IUserInforData } from "../interface"

export const changeIsLoading = (data: boolean) => {
    return {
        type: 'changeIsLoading',
        payload: data,
    }
}

export const slicePage = (data: IAllProductData[]) => {
    return {
        type: 'slicePage',
        payload: data,
    }
}

export const changeProductListFilter = (data: IAllProductData[]) => {
    return {
        type: 'changeProductListFilter',
        payload: data,
    }
}

export const changeUserInforData = (data: IUserInforData) => {
    return {
        type: 'changeUserInforData',
        payload: data,
    }
}

/* Total all product */
export const increaseTotalAllProductPrice = (data: number) => {
    return {
        type: 'increaseTotalAllProductPrice',
        payload: data,
    }
}
export const decreaseTotalAllProductPrice = (data: number) => {
    return {
        type: 'decreaseTotalAllProductPrice',
        payload: data,
    }
}
export const initTotalAllProductPrice = (data: number) => {
    return {
        type: 'initTotalAllProductPrice',
        payload: data,
    }
}
/* End Total all product */

export const changeCartData = (data: ICartData[]) => {
    return {
        type: 'changeCartData',
        payload: data,
    }
}

export const changeAllProductDataImmutation = (data: IAllProductData[]) => {
    return {
        type: 'changeAllProductDataImmutation',
        payload: data,
    }
}