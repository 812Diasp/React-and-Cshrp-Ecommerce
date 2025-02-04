import axios from 'axios';
import {

    loginSuccess,
    logout,
    registerSuccess,
    setUser,
    setFavorites,
    setTracking // Убедитесь, что этот импорт присутствует
} from '../features/auth/authSlice.js';

// Логин пользователя
export const loginUser = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5248/api/auth/login', { email, password });
        const token = response.data.token;
        sessionStorage.setItem('token', token);

        // Загружаем пользователя после успешного логина
        await dispatch(fetchUser());
        return token;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

// Регистрация пользователя
export const registerUser = (username, email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5248/api/auth/register', { username, email, password });
        const token = response.data.token;
        sessionStorage.setItem('token', token);

        // Загружаем пользователя после успешной регистрации
        await dispatch(fetchUser());
        return token;
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};

// Загрузка данных пользователя
export const fetchUser = () => async (dispatch) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) return dispatch(setUser(null));

        const response = await axios.get('http://localhost:5248/api/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch(setUser(response.data));
    } catch (error) {
        console.error("Error fetching user:", error);
        dispatch(setUser(null));
    }
};

// Выход пользователя
export const logOut = () => (dispatch) => {
    sessionStorage.removeItem('token');
    dispatch(logout());
};

// Обновление списка избранного
export const updateFavorites = (productId, isAdding) => async (dispatch, getState) => {
    try {
        const token = sessionStorage.getItem('token');
        const csrfToken = await fetchCsrfToken();

        const response = await axios.post(
            `http://localhost:5248/api/products/${productId}/favorites`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-CSRF-Token": csrfToken
                },
                withCredentials: true
            }
        );

        const { user } = getState().auth;
        if (response.data.includes("removed")) {
            dispatch(setFavorites(user.favorites.filter(id => id !== productId)));
        } else {
            dispatch(setFavorites([...user.favorites, productId]));
        }
    } catch (error) {
        console.error("Error updating favorites:", error);
    }
};

// Обновление списка отслеживания
export const updateTracking = (productId, isAdding) => async (dispatch, getState) => {
    try {
        const token = sessionStorage.getItem('token');
        const csrfToken = await fetchCsrfToken();

        const response = await axios.post(
            `http://localhost:5248/api/products/${productId}/tracking`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-CSRF-Token": csrfToken
                },
                withCredentials: true
            }
        );

        const { user } = getState().auth;
        if (response.data.includes("removed")) {
            dispatch(setTracking(user.tracking.filter(id => id !== productId)));
        } else {
            dispatch(setTracking([...user.tracking, productId]));
        }
    } catch (error) {
        console.error("Error updating tracking:", error);
    }
};

// Получение CSRF-токена
const fetchCsrfToken = async () => {
    try {
        const response = await axios.get('http://localhost:5248/api/csrf', { withCredentials: true });
        return response.data.token;
    } catch (error) {
        console.error("Error fetching CSRF token:", error);
        throw error;
    }
};