import { ACTIONS } from "../actions/actions.js";

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
    case ACTIONS.CLEAR_USER: {
      return initialState;
    }
    default:
      return state;
  }
};
