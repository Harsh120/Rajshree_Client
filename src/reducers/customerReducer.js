import { 
    CUSTOMER_LOADED, 
    CUSTOMER_LOADING, 
    EDIT_CUSTOMER_SUCCESS, 
    EDIT_CUSTOMER_FAIL,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAIL,
    AUTH_ERROR
} from '../actions/types';

const initalState = {
    isLoading: false,
    customer: []
};

export default function(state = initalState, action) {
    switch(action.type) {
        case AUTH_ERROR:
            return {
                ...state,
                isLoading: false
            };
        case CUSTOMER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case CUSTOMER_LOADED:
            return {
                ...state,
                isLoading: false,
                customer: action.payload
            };
        case EDIT_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                customer: state.customer.map((customer) => customer.id === action.id ? action.payload : customer)
            };
        case DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                customer: state.customer.filter(u => u.id !== action.payload)
            }
        case DELETE_CUSTOMER_FAIL:
        case EDIT_CUSTOMER_FAIL:
        default:
            return state;
    }
}
