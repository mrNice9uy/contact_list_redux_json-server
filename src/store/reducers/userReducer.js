import { ACTIONS } from "../actions/actions.js";

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER: {
      const user = action.payload;
      debugger;
      return {
        ...state,
        user,
      };
    }
    default:
      return state;
  }
};
