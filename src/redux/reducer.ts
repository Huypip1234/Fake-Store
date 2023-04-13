import { combineReducers } from "redux";
import { IAllProductData, ICartData } from "../interface";
import { initUserInforData } from "../interface/initValue";

interface IChangeIsLoadingAction {
    type: string
    payload: boolean
}
interface IChangeAllProductDataSlicedAction {
    type: string
    payload: IAllProductData[]
}
interface IChangeProductListFilterAction {
    type: string
    payload: IAllProductData[]
}
interface IChangeUserInforDataAction {
    type: string
    payload: string
}

const isLoadingReducer = (isLoading = false, action: IChangeIsLoadingAction) => {
    switch (action.type) {
        case 'changeIsLoading':
            return action.payload;
        default:
            return isLoading;
    }
}

const pageSliceReducer = (allProductDataSliced: IAllProductData[][] = [], action: IChangeAllProductDataSlicedAction) => {
    switch (action.type) {
        case 'slicePage':
            const totalArray = Math.floor(action.payload.length / 16 + 1);
            let start = 0,
                end = 15,
                array: IAllProductData[][] = [];
            for (let i = 0; i < totalArray; i++) {
                if (i === totalArray - 1) {
                    array[i] = action.payload.slice(start);
                    break;
                }
                array[i] = action.payload.slice(start, end + 1);
                start += 16;
                end += 16;
            }
            return array;
        default:
            return allProductDataSliced;
    }
}

const productListFilterReducer = (productListFilter = [], action: IChangeProductListFilterAction) => {
    switch (action.type) {
        case 'changeProductListFilter':
            return action.payload;
        default:
            return productListFilter;
    }
}

const userInforDataReducer = (userInforData = initUserInforData, action: IChangeUserInforDataAction) => {
    switch (action.type) {
        case 'changeUserInforData':
            return action.payload;
        default:
            return userInforData;
    }
}

const totalAllProductPriceReducer = (total = 0, action: { type: string, payload: number }) => {
    switch (action.type) {
        case 'initTotalAllProductPrice':
            return action.payload;
        case 'increaseTotalAllProductPrice':
            // chuan hoa to string chi co 1 so sau dau phay
            let inp: string = parseFloat((total + action.payload).toString()).toFixed(2);
            // chuyen sang float de cong vao
            let out = parseFloat(inp);
            return out;
        case 'decreaseTotalAllProductPrice':
            // chuan hoa to string chi co 1 so sau dau phay
            let input: string = parseFloat((total - action.payload).toString()).toFixed(2);
            // chuyen sang float de cong vao
            let output = parseFloat(input);
            return output;
        default:
            return total;
    }
}

const cartDataReducer = (cartData = [], action: { type: string, payload: ICartData[] }) => {
    switch (action.type) {
        case 'changeCartData':
            return action.payload;
        default:
            return cartData;
    }
}

const allProductDataImmutationReducer = (allProductDataImmutation = [], action: { type: string, payload: IAllProductData[] }) => {
    switch (action.type) {
        case 'changeAllProductDataImmutation':
            return action.payload;
        default:
            return allProductDataImmutation;
    }
}

//CombineReducers: Gộp các reducer lại.
const allReducers = combineReducers({
    isLoading: isLoadingReducer,

    pageSlice: pageSliceReducer,

    productListFilter: productListFilterReducer,

    userInforData: userInforDataReducer,

    totalAllProductPrice: totalAllProductPriceReducer,

    cartData: cartDataReducer,

    allProductDataImmutation: allProductDataImmutationReducer,
});

export default allReducers