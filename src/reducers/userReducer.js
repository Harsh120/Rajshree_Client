import { 
    USER_LOADED, 
    USER_LOADING, 
    EDIT_USER_SUCCESS, 
    EDIT_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from '../actions/types';

const initalState = {
    isLoading: false,
    user: [],
    newUser: null
};

export default function(state = initalState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: state.user.map((user) => user.id === action.id ? action.payload : user)
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: state.user.filter(u => u.id !== action.payload)
            }
        case DELETE_USER_FAIL:
        case EDIT_USER_FAIL:
        default:
            return state;
    }
}
