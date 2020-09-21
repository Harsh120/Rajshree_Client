import axios from 'axios';
import { 
    MORTAGE_LOADED, 
    MORTAGE_LOADING, 
    MORTAGE_LOADING_ERROR, 
    CREATE_NEW_MORTAGE_SUCCESS, 
    CREATE_NEW_MORTAGE_FAIL,
    DELETE_MORTAGE,
    EDIT_MORTAGE_SUCCESS,
    EDIT_MORTAGE_FAIL
} from './types';
import { returnErrors } from './errorActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

// Get all User
export const loadMortages = id => (dispatch) => {
    // User Loading
    dispatch({ type: MORTAGE_LOADING });
    axios.get('/user/mortages/'+id)
        .then(res => {
            if(!res.data.msg) {
                dispatch({
                    type: MORTAGE_LOADED,
                    payload: res.data
                })
            }
            else {
                dispatch(returnErrors(res.data.msg, res.data.success));
                dispatch({
                    type: MORTAGE_LOADING_ERROR
                })
            } 
        })
}

export const addNewMortage = newMortage => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.post('/mortage', newMortage, config)
    .then(res => {
        if(res.data.msg) {
            dispatch({
                type: CREATE_NEW_MORTAGE_FAIL
            })
            toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
        }
        else {
            dispatch({
                type: CREATE_NEW_MORTAGE_SUCCESS,
                payload: res.data
            })
            toast.success('New Mortage Created', {position: toast.POSITION.BOTTOM_LEFT}) 
        }
    });
}

export const editMortage = (id, EditedMortage) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.put('/mortage/edit/'+id, EditedMortage, config)
        .then(res => {
            if(res.data.msg) {
                dispatch({
                    type: EDIT_MORTAGE_FAIL
                })
                toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
            }
            else {
                dispatch({
                    type: EDIT_MORTAGE_SUCCESS,
                    payload: res.data
                })
                toast.success('Mortage Edited', {position: toast.POSITION.BOTTOM_LEFT}) 
            }
        })
}

export const deleteMortage = id => (dispatch) => {
    axios.delete('/mortage/'+id)
        .then(res=> {
            if(res.data.success===false) {
                toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
            }
            else {
                dispatch({
                    type: DELETE_MORTAGE,
                    payload: id
                })
                toast.success(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
            }
        })
}