import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainScreen from "./components/MainScreen/MainScreen";
import "antd/dist/antd.min.css";
import "./App.scss";

function App() {
  /*const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_CONTACTS,
      payload: {
        id: 1,
        name: "qwe",
        email: "qwr@dg.com",
      },
    });
  });*/

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <div className="app-wrapper-content">
          <MainScreen />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
