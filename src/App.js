import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import MainScreen from "./components/MainScreen/MainScreen";
import "antd/dist/antd.min.css";
import "./App.scss";

function App() {
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "Ann",
      email: "ann@gmail.com",
    },
    {
      id: "2",
      name: "Bill",
      email: "bill@gmail.com",
    },
    {
      id: "3",
      name: "Jim",
      email: "jim@gmail.com",
    },
  ]);
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
