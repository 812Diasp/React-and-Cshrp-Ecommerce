
import axios from "axios";

export const API_URL = "https://localhost:7183";

export const fetchCsrfToken = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/csrf`, { withCredentials: true });
        return response.data.token;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
};