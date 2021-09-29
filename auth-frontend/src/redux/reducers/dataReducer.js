import { SET_USERS, POST_NEW_USER, LOADING_DATA} from '../types';

const initialState = {
	users: [],
	loading: false
}

export default function( state = initialState, action){
	switch(action.type){
	case LOADING_DATA:
			return {
					...state,
					loading: true
			}
	case SET_USERS:
			return {
					...state,
					users: action.payload,
					loading: false
			}
	case POST_NEW_USER:
			return {
					...state,
					users: [
							action.payload,
							...state.users
					]
			}
	default:
			return state 
	}
}