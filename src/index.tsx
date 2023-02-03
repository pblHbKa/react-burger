import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { compose, createStore, applyMiddleware } from "redux";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { rootReducer, RootState } from "./services/reduces";
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

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const root = ReactDOM.createRoot(document.getElementById("root")!);

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
