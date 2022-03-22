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

export const setConnectionInProgressState = (state) => ({
  type: ACTIONS.SET_CONNECTION_IN_PROGRESS_STATE,
  isConnectionInProgress: state,
});

// ----

export const showContactList = (contactList) => ({
  type: ACTIONS.SHOW_CONTACT_LIST,
  contactList,
});

export const setContacts = (contactsList) => {
  return {
    type: ACTIONS.SET_CONTACTS,
    payload: contactsList,
  };
};

export const editContact = (contact) => {
  return {
    type: ACTIONS.EDIT_CONTACT,
    payload: contact,
  };
};
