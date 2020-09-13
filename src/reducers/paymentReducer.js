import {
    PAYMENT_LOADING,
    PAYMENT_LOADED,
    PAYMENT_LOADING_ERROR,
    CREATE_NEW_PAYMENT_SUCCESS,
    CREATE_NEW_PAYMENT_FAIL
} from '../actions/types';

const initialState = {
    isLoading: false,
    payments: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case PAYMENT_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case PAYMENT_LOADED:
            return {
                ...state,
                isLoading: false,
                payments: action.payload
            }
        case CREATE_NEW_PAYMENT_FAIL:
        case PAYMENT_LOADING_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case CREATE_NEW_PAYMENT_SUCCESS:
            return {
                ...state,
                payments: {
                    ...state.mortage,
                    payments: [action.payload, ...state.payments.payments || {}]
                }
            }
        default:
            return state;
    }
}