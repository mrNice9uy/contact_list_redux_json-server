import { ACTIONS } from "./actions";

export const getContacts = () => ({
  type: ACTIONS.GET_CONTACT,
  payload: {},
});

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
