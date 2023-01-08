import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./services/reduces";
import { Provider } from "react-redux/es/exports";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { socketMiddleware } from "./services/middlewares/middleware";
import {
  connectionStart,
  connectionClose,
  connectionGetData,
  wsInit,
} from "./services/reduces/wsReducers";

const wsActions = {
  connectionStart,
  connectionClose,
  connectionGetData,
  wsInit,
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers();

const store = new configureStore({
  reducer: rootReducer,
  enhancer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

export * as selectors from "./utils/selectors";
