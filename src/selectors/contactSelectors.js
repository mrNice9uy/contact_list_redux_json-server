import { createSelector } from "reselect";

export const getMain = (state) => state.main;
export const getContactsState = (state) => {
  debugger;
  return state.contacts;
};

export const getContactsList = createSelector(
  getContactsState,
  ({ contacts }) => {
    debugger;
    contacts.map((item) => ({ ...item, key: item.id }));
  }
);
