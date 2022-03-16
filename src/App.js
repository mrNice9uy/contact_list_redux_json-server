import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import api from "./api/contacts";
import MainScreen from "./components/MainScreen/MainScreen";
import "antd/dist/antd.min.css";
import "./App.scss";

function App() {
  const [contacts, setContacts] = useState([]);

  //Retrive contacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  //useEffect(() => {}, [contacts]);

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <div className="app-wrapper-content">
          <MainScreen contacts={contacts} setContacts={setContacts} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
