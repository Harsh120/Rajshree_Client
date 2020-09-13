import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState = {
    msg: {},
    success: null,
    id: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                success: action.payload.success,
                id: action.payload.id
            };
        case CLEAR_ERRORS:
            return {
                msg: {},
                success: null,
                id: null
            };
        default:
            return state
    }
}