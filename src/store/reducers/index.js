import { combineReducers } from "redux";
import { contactReducer } from "./contactReducer";

export const reducers = combineReducers({
  allContacts: contactReducer,
});
