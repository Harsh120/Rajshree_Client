import { combineReducers } from 'redux';
import userReducer from './userReducer';
import mortageReducer from './mortageReducer';
import errorReducer from './errorReducer';
import paymentReducer from './paymentReducer';

export default combineReducers({
    user: userReducer,
    mortage: mortageReducer,
    error: errorReducer,
    payment: paymentReducer
});