import axios from 'axios';
import { loginSuccess, logout, registerSuccess, setAuth } from '../features/auth/authSlice.js';
export const loginUser = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5248/api/auth/login', { email, password });
        const token = response.data.token;
        const user = response.data.user;
        sessionStorage.setItem('token', token);
        dispatch(loginSuccess({ token: token, user: user }));
        return user;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const registerUser = (username, email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5248/api/auth/register', { username, email, password });
        const user = response.data.user;
        const token = response.data.token;
        sessionStorage.setItem('token', token);
        dispatch(registerSuccess({ user: user}));
        return user;
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};

export const logOut = () => (dispatch) => {
    sessionStorage.removeItem("token")
    dispatch(logout());
};