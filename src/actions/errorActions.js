import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return error 
export const returnErrors = (msg, success, id=null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, success, id }
    };
};

// Clear error
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
