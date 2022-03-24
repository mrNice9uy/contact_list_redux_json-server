import { ACTIONS } from '../actions/actions.js';

const initialState = {};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.SET_USER: {
			const user = action.payload;
			return {
				...state,
				user,
			};
		}
		case ACTIONS.SET_USER_INFO: {
			const info = action.payload;
			return {
				...state,
				info,
			};
		}
		case ACTIONS.CLEAR_USER: {
			return initialState;
		}
		default:
			return state;
	}
};
