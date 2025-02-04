import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    isAuthenticated: false,
    user: {
        id: null,
        username: '',
        email: '',
        favorites: [], // Список ID избранных товаров
        tracking: []   // Список ID отслеживаемых товаров
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

const authSlice = createSlice({
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
            state.user = action.payload.user || initialState.user;
        },
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.user = action.payload.user || initialState.user;
        },
        registerSuccess: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.user = action.payload.user || initialState.user;
        },
        setUser: (state, action) => {
            state.user = action.payload || initialState.user;
            state.isAuthenticated = Boolean(action.payload); // Если payload === null, isAuthenticated становится false
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = initialState.user;
        },
        setFavorites: (state, action) => {
            state.user.favorites = action.payload;
        },
        setTracking: (state, action) => {
            state.user.tracking = action.payload;
        }
    }
});

// Экспорт всех действий
export const {
    reset,
    setAuth,
    loginSuccess,
    logout,
    registerSuccess,
    setUser,
    setFavorites,
    setTracking // Обратите внимание на этот экспорт
} = authSlice.actions;

export default authSlice.reducer;