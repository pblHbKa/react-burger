import { getCookie } from "../../utils/cookies";
import { connectionStart,
  connectionClose,
  connectionGetData } from "../reduces/wsReducers"

export const socketMiddleware = (wsActions) => {
    return store => {
      let socket = null;
  
      return next => action => {
        const token = getCookie("accessToken");
        const { dispatch, getState } = store;
        const { type, payload } = action;
        const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

        if (type === wsInit) {
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
            socket.close('1000', 'socket close');
            dispatch(connectionClose());
          };
        }
  
        next(action);
      };
    };
  };