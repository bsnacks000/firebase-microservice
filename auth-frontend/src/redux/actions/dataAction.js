import { SET_ERRORS, SET_USERS, POST_NEW_USER, CLEAR_ERRORS, LOADING_UI, LOADING_DATA } from '../types';
import axios from 'axios'; 
import {keysToCamel, keysToSnake } from '../../utils/helper';
import {validateSignupData} from '../../utils/validator';

export const createUser = (newUserData) => (dispatch) => {

    dispatch({ type: LOADING_UI })

    const { errors, valid } = validateSignupData(newUserData)

    if (!valid) {
        dispatch({
            type: SET_ERRORS,
            payload: errors
        })
        return ;
    }

    const userData = { user: {email: newUserData.email, displayName: newUserData.displayName, role: newUserData.role,
                            password: newUserData.password } }

    axios.post('/users', keysToSnake(userData))
    .then((res) => {
        dispatch({ type: POST_NEW_USER,
            payload: keysToCamel(res.data)})
        dispatch( clearErrors() )
    }).catch((err) => {
        console.log(err)
        dispatch({
            type: SET_ERRORS,
            payload: err.detail
        })
    });

}

export const getListOfUsers = () => (dispatch) => {
    
    dispatch({ type: LOADING_DATA});
    axios.get('/users/')
    .then(res => {
        dispatch({ type: SET_USERS, 
                    payload: keysToCamel(res.data.users)})
    })
    .catch(err => {
        dispatch({ type: SET_USERS,
                payload: []})
    })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}