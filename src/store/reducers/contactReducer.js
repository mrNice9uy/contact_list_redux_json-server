import { ACTIONS } from "../actions/actions.js";

const initialState = {
  contacts: [
    {
      id: null,
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
    default:
      return state;
  }
};
