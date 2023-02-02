import { Middleware } from "redux";
import { getCookie } from "../../utils/cookies";
import { IwsActions } from "../reduces/wsReducers"

export const socketMiddleware = (wsActions: IwsActions): Middleware => {
    return store => {
      let socket: WebSocket|null = null;
      const { connectionStart, connectionClose, connectionGetData, wsInit } = wsActions;
  
      return next => action => {
        const token = getCookie("accessToken");
        const { dispatch, getState } = store;
        const { type, payload } = action;

        if (wsInit.match(action)) {
            const isAuth = payload.isAuth
            const wsUrl = isAuth ? payload.url + `?token=${token}` : payload.url;
            socket = new WebSocket(wsUrl);
        }

        if (socket) {
          socket.onopen = event => {
            dispatch(connectionStart());
          };
  
          socket.onerror = event => {
            dispatch(connectionClose());
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            dispatch(connectionGetData(restParsedData));
          };
  
          socket.onclose = event => {
            socket!.close(1000, 'socket close');
            dispatch(connectionClose());
          };
        }
  
        next(action);
      };
    };
  };