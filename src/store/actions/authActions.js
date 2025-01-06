import axios from 'axios'

export const loginSuccess = (payload) => ({
    type: 'LOGIN_SUCCESS',
    payload
});

export const registerSuccess = (payload) => ({
    type: 'REGISTER_SUCCESS',
    payload
});
export const logOut = () => ({
    type: 'LOGOUT',
});
export const loginUser = (username, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:5248/api/Auth/login', {username,password});

            dispatch(loginSuccess({token: response.data.token,user:{username}}));
            sessionStorage.setItem("token", response.data.token)
        } catch (error) {
            console.log(error)
            // Обработка ошибки
        }
    }
};
export const registerUser = (username,email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:5248/api/Auth/register', {username,email, password});
            dispatch(registerSuccess({user:{username, email}}));
        } catch (error) {
            console.log(error)
            // Обработка ошибки
        }
    }
};