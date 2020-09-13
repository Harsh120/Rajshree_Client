import { USER_LOADED, USER_LOADING} from '../actions/types';

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
        default:
            return state;
    }
}
