import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';
import fireapp from '../../utils/fire.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {keysToCamel} from '../../utils/helper';
import { validateLoginData, validateSigupData, validateUserDetail } from '../../utils/validator';
import { firebaseAuthErrorHandler } from '../../utils/errorHandler';

export const loginUser = (userData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI})

    const { errors, valid } = validateLoginData(userData)

    if (!valid) {
        dispatch({
            type: SET_ERRORS,
            payload: errors
        })
        return ;
    }
    const auth = getAuth(fireapp);

    signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            setAuthorizationHeader(token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch((err) => {
            
            dispatch({
                type: SET_ERRORS,
                payload: firebaseAuthErrorHandler(err)
            })
        });
}


export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIDtoken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED })
}
  

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/currentuser/')
        .then(res => {
            dispatch({ 
                type: SET_USER,
                payload: keysToCamel(res.data)
             })
        })
        .catch(err => console.log(err));
}

const setAuthorizationHeader = (token) => {
    const FBIDtoken = `Bearer ${token}`;
    localStorage.setItem('FBIDtoken', FBIDtoken)
    axios.defaults.headers.common['Authorization'] = FBIDtoken
}