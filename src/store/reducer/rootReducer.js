import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    app: appReducer
});

export default rootReducer;