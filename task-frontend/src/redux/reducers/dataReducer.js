import { SET_TASKS, POST_TASK, LOADING_DATA} from '../types';

const initialState = {
	tasks: [],
	loading: false
}

export default function( state = initialState, action){
	switch(action.type){
	case LOADING_DATA:
			return {
					...state,
					loading: true
			}
	case SET_TASKS:
			return {
					...state,
					tasks: action.payload,
					loading: false
			}
	case POST_TASK:
			return {
					...state,
					tasks: [
							action.payload,
							...state.tasks
					]
			}
	default:
			return state 
	}
}