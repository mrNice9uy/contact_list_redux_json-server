//import axios from 'axios';

import api from "./setupAPI";

export const getContacts = () => api.get("/contacts");

export const addContact = (model) => api.post("/contacts", model);

export const deleteContactById = (contactId) =>
  api.delete(`/contacts/${contactId}`);
