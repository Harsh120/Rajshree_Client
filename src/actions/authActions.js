import axios from 'axios';

import {
    USER_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const register = (history, newUser) => (dispatch) => {
    dispatch({type: USER_LOADING});

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.post('api/register', newUser, config)
        .then(res => {
            if(res.data.success===false) {
                dispatch({
                    type: REGISTER_FAIL
                })
                toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
            }
            else {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
                toast.success(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT}); 
                history.push("/");
            }
        })
}

export const login = (history, User) => (dispatch) => {
    dispatch({type: USER_LOADING});

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }  

    axios.post('api/login', User, config)
        .then(res => {
            if(res.data.success===false) {
                dispatch({
                    type: LOGIN_FAIL
                })
                toast.error(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT})
            }
            else {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
                toast.success(res.data.msg, {position: toast.POSITION.BOTTOM_LEFT});
                history.push("/dashboard");
            }
        })
}

export const logout = () => {
    toast.success("Logout Success", {position: toast.POSITION.BOTTOM_LEFT})
    return {
        type: LOGOUT_SUCCESS
    };
   
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
    // Get token from localStorage
    const token = getState().auth.token;
    
    // Header
    const config = {
        headers: {
            "Content-type": "applicaton/json",
            "Authorization": "Bearer " + token
        }
    }
    
    return config;
}