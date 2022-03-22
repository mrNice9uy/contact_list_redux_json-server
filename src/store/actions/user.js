import { ACTIONS } from "./actions";

export const setUser = (user) => {
  return {
    type: ACTIONS.SET_USER,
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: ACTIONS.CLEAR_USER,
    payload: {},
  };
};
