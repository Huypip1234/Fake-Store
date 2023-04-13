import {createStore} from 'redux';
import allReducers from "./reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const composedEnhancers = composeWithDevTools(); //react dev tool extention

//3 tham số: reducer, initValue, enhance (middleware)
//neu truyen 2 tham so: reducer, enhance
const store = createStore(allReducers, composedEnhancers); /*  */

export default store;