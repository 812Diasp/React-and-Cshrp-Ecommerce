import axios from 'axios';
import {API_URL} from "../../Constants.js";

export const fetchProductsStart = () => ({
    type: 'FETCH_PRODUCTS_START',
});

export const fetchProductsSuccess = (products) => ({
    type: 'FETCH_PRODUCTS_SUCCESS',
    payload: products,
});

export const fetchProductsError = (error) => ({
    type: 'FETCH_PRODUCTS_ERROR',
    payload: error,
});
//
// export const fetchProducts = () => {
//     return async (dispatch) => {
//         dispatch(fetchProductsStart());
//         try {
//             const response = await axios.get(`${API_URL}/api/products`);
//             dispatch(fetchProductsSuccess(response.data));
//         } catch (error) {
//             dispatch(fetchProductsError(error.message));
//         }
//     };
// };