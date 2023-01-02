import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./services/reduces";
import { Provider } from "react-redux/es/exports";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { socketMiddleware } from './services/middlewares/middleware'
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './services/action-types/wsActionTypes';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers();

const store = new configureStore({
  reducer: rootReducer,
  enhancer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(socketMiddleware(wsActions)),
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
