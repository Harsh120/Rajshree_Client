import {
    USER_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('isAuthenticated') || false,
    isLoading: false,
    user_name: localStorage.getItem('user_name') || null,
    user: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('user_name', action.payload.user.name);
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                ...action.payload
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user_name');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}