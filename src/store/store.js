import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Исправленный импорт
import rootReducer from './reducer/rootReducer.js';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;