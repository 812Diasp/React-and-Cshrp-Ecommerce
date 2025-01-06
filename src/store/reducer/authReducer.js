const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                user: action.payload.user,
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                user:action.payload.user,
                isAuthenticated: true
            };

        default:
            return state;
    }
};

export default authReducer;