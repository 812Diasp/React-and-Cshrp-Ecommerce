const initialState = {
    language: 'en', // начальный язык
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;