// addReview.js
import makeApiRequest from './apiUtils';
import {API_URL} from "../../src/Constants.js";

const addReview = async (productId, reviewData) => {
    try {
        console.log("Sending review data:", reviewData);
        const token = sessionStorage.getItem('token');
        const response = await makeApiRequest({
            method: 'POST',
            url: `${API_URL}/api/products/${productId}/reviews`,
            data: reviewData, // <--- Проверьте что именно так.
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            csrfUrl: `${API_URL}/api/csrf`,
        });

        console.log("Received response:", response);
        return response;
    } catch (error) {
        console.error("Error during review addition:", error);
        if (error.response && error.response.data) {
            console.error("Response data:", error.response.data);
        }
        throw error;
    }
};

export default addReview;