import axios from 'axios';
import { 
    USER_LOADED, 
    USER_LOADING,
    CREATE_NEW_CUSTOMER_SUCCESS,
    CREATE_NEW_CUSTOMER_FAIL
} from './types';
import { returnErrors } from './errorActions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

// Get all User
export const loadAllUser = () => (dispatch) => {
    // User Loading
    dispatch({ type: USER_LOADING });
    axios.get('/users')
    .then(res => {
        if(res.data.msg) {
            dispatch(returnErrors(res.data.msg, res.data.sucess));
            toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
        }
        else {
            dispatch({
                type: USER_LOADED,
                payload: res.data.data
            })
            toast.success('All Customer Loaded', {position: toast.POSITION.BOTTOM_LEFT}) 
        }
    });
}

export const addNewUser = newUser => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.post('/user', newUser, config)
    .then(res => {
        if(res.data.msg) {
            dispatch({
                type: CREATE_NEW_CUSTOMER_FAIL
            })
            toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
        }
        else {
            dispatch({
                type: CREATE_NEW_CUSTOMER_SUCCESS,
                payload: res.data
            })
            toast.success('New Customer Created', {position: toast.POSITION.BOTTOM_LEFT}) 
        }
    });
}