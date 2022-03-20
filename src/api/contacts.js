//import axios from 'axios';

import api from "./setupAPI";

export const getContacts = () => api.get("/contacts");
