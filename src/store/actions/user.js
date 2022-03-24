import { ACTIONS } from "./actions";

export const setUser = (user) => {
  return {
    type: ACTIONS.SET_USER,
    payload: user,
  };
};

export const setUserInfo = (info) => {
  debugger;
  return {
    type: ACTIONS.SET_USER_INFO,
    payload: info,
  };
};

export const clearUser = () => {
  return {
    type: ACTIONS.CLEAR_USER,
    payload: {},
  };
};
