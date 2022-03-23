import { ACTIONS } from "./actions";

export const getContacts = () => ({
  type: ACTIONS.GET_CONTACT,
  payload: {},
});

export const addContact = (contactData) => ({
  type: ACTIONS.ADD_CONTACT,
  payload: contactData,
});

export const deleteContactById = (contactId) => ({
  type: ACTIONS.DELETE_CONTACT,
  payload: contactId,
});

export const updateContactById = (contactId) => ({
  type: ACTIONS.UPDATE_CONTACT,
  payload: contactId,
});

export const clearContact = () => {
  return {
    type: ACTIONS.CLEAR_CONTACT,
    payload: [],
  };
};

export const setConnectionInProgressState = (state) => ({
  type: ACTIONS.SET_CONNECTION_IN_PROGRESS_STATE,
  isConnectionInProgress: state,
});
