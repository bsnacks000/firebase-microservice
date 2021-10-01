import { SET_ERRORS, SET_TASKS, POST_TASK, CLEAR_ERRORS, LOADING_UI, LOADING_DATA } from '../types';
import axios from 'axios'; 
import {keysToCamel, keysToSnake } from '../../utils/helper';

export const postTask = (newTask) => (dispatch) => {

    dispatch({ type: LOADING_UI })


    const task = { task: {body: newTask.body } }

    axios.post('/tasks', keysToSnake(task))
    .then((res) => {
        dispatch({ type: POST_TASK,
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

export const getTasks = () => (dispatch) => {
    
    dispatch({ type: LOADING_DATA});
    axios.get('/tasks/')
    .then(res => {
        dispatch({ type: SET_TASKS, 
                    payload: keysToCamel(res.data.tasks)})
    })
    .catch(err => {
        dispatch({ type: SET_TASKS,
                payload: []})
    })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}