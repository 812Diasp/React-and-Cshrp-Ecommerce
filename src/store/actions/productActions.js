import axios from 'axios';

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

export const fetchProducts = () => {
    return async (dispatch) => {
        dispatch(fetchProductsStart());
        try {
            const response = await axios.get('https://api.example.com/products');
            dispatch(fetchProductsSuccess(response.data));
        } catch (error) {
            dispatch(fetchProductsError(error.message));
        }
    };
};