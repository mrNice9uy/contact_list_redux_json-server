import { ACTIONS } from "../actions/actions.js";

const initialState = {
  isConnectionInProgress: false,
  contacts: [
    {
      id: 0,
      name: "",
      email: "",
    },
  ],
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_CONTACT_SUCCESS: {
      const contacts = action.payload.data;
      return {
        ...state,
        contacts,
      };
    }
    case ACTIONS.SET_CONTACTS:
      return { ...state, contactList: action.payload };
    case ACTIONS.SET_CONNECTION_IN_PROGRESS_STATE:
      return {
        ...state,
        isConnectionInProgress: action.isConnectionInProgress,
      };
    default:
      return state;
  }
};
