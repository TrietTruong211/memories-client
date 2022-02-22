import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Importing redux to perform actions to backend
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

import "./index.css";
import App from "./App";

// store = global state that can be accessed from anywhere
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
