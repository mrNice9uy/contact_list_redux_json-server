import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { Provider } from "react-redux";
import { rootReducer } from "./store/reducers/reducers";
import { rootSaga } from "./store/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
