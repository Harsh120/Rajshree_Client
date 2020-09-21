import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import mortageReducer from './mortageReducer';
import errorReducer from './errorReducer';
import paymentReducer from './paymentReducer';

export default combineReducers({
    customer: customerReducer,
    mortage: mortageReducer,
    error: errorReducer,
    payment: paymentReducer
});