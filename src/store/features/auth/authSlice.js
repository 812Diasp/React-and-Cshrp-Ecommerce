import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
        },
        registerSuccess: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
    },
});

export const { reset, setAuth, loginSuccess, logout, registerSuccess } = authSlice.actions;
export default authSlice.reducer;