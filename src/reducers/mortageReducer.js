import { 
    MORTAGE_LOADED,
    MORTAGE_LOADING,
    MORTAGE_LOADING_ERROR,
    CREATE_NEW_MORTAGE_SUCCESS,
    CREATE_NEW_MORTAGE_FAIL,
    DELETE_MORTAGE
} from '../actions/types';

const initalState = {
    isLoading: false,
    mortage: []
};

export default function(state = initalState, action) {
    switch(action.type) {
        case MORTAGE_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case MORTAGE_LOADED:
            return {
                ...state,
                isLoading: false,
                mortage: action.payload
            };
        case CREATE_NEW_MORTAGE_SUCCESS:
            return {
                ...state,
                mortage: {
                    ...state.mortage,
                    mortages: [action.payload, ...state.mortage.mortages || {}]
                }
            }
        case DELETE_MORTAGE:
            return {
                ...state,
                mortage: {
                    ...state.mortage,
                    mortages: state.mortage.mortages.filter(m => m.id !== action.payload)
                }
            }
        case MORTAGE_LOADING_ERROR:
        case CREATE_NEW_MORTAGE_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}
