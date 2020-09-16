import axios from 'axios';
import { 
    PAYMENT_LOADING, 
    PAYMENT_LOADED, 
    PAYMENT_LOADING_ERROR,
    CREATE_NEW_PAYMENT_SUCCESS,
    CREATE_NEW_PAYMENT_FAIL,
    CHANGE_STATUS_OF_MORTAGE
 } from './types';
import { returnErrors } from './errorActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

//Get all Payments of a mortage
export const loadPayments = id => (dispatch) => {
    dispatch({ type: PAYMENT_LOADING });
    axios.get('/mortage/payments/'+id)
            .then(res => {
                    if(!res.data.msg) {
                        dispatch({
                            type: PAYMENT_LOADED,
                            payload: res.data
                        })
                    }
                    else {
                        dispatch(returnErrors(res.data.msg, res.data.success));
                        dispatch({
                            type: PAYMENT_LOADING_ERROR
                        })
                    }
            })
}

export const addNewPayment = newPayment => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.post('/mortage/payment', newPayment, config)
    .then(res => {
        if(res.data.msg) {
            dispatch({
                type: CREATE_NEW_PAYMENT_FAIL
            })
            toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
        }
        else {
            dispatch({
                type: CREATE_NEW_PAYMENT_SUCCESS,
                payload: res.data
            })
            toast.success('New Payment Created', {position: toast.POSITION.BOTTOM_LEFT}) 
        }
    });
}

export const changeStatus = id => (dispatch) => {
    axios.put('/mortage/changeStatus/'+id)
        .then(res=> {
            if(res.data.success===false) {
                toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
            }
            else {
                dispatch({
                    type: CHANGE_STATUS_OF_MORTAGE,
                    payload: res.data.newStatus
                })
                toast.success(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
            }
        })
}