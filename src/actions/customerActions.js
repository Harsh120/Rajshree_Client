import axios from 'axios';
import { 
    CUSTOMER_LOADED, 
    CUSTOMER_LOADING,
    CREATE_NEW_CUSTOMER_SUCCESS,
    CREATE_NEW_CUSTOMER_FAIL,
    EDIT_CUSTOMER_SUCCESS,
    EDIT_CUSTOMER_FAIL,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAIL
} from './types';
import { returnErrors } from './errorActions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

// Get all User
export const loadAllCustomer = () => (dispatch) => {
    // User Loading
    dispatch({ type: CUSTOMER_LOADING });
    axios.get('/customers')
    .then(res => {
        if(res.data.msg) {
            dispatch(returnErrors(res.data.msg, res.data.sucess));
            toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
        }
        else {
            dispatch({
                type: CUSTOMER_LOADED,
                payload: res.data.data
            })
        }
    });
}

export const addNewCustomer = newCustomer => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(newCustomer);
    axios.post('/customer', newCustomer, config)
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

export const editCustomer = (id, updatedCustomer) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.put('/customer/edit/'+id, updatedCustomer, config)
        .then(res => {
            if(res.data.msg) {
                dispatch({
                    type: EDIT_CUSTOMER_FAIL
                })
                toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
            }
            else {
                dispatch({
                    type: EDIT_CUSTOMER_SUCCESS,
                    payload: res.data,
                    id: res.data.id
                })
                toast.success('Customer Edited', {position: toast.POSITION.BOTTOM_LEFT}) 
            }
        })
}

export const deleteCustomer = id => (dispatch) => {
    axios.delete('/customer/'+id)
        .then(res=> {
            if(res.data.success===false) {
                dispatch({
                    type: DELETE_CUSTOMER_FAIL
                });
                toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
            }
            else {
                dispatch({
                    type: DELETE_CUSTOMER_SUCCESS,
                    payload: id
                })
                toast.success(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
            }
        })
}