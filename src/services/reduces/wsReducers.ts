import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "../types/data";

interface IOrderInfo {
  wsConnected: boolean,
  wsInit: boolean,
  data: Array<TOrder>,
  total: number,
  totalToday: number
};

 const initialState: IOrderInfo = {
    wsConnected: false,
    wsInit: false,
    data: [],
    total: 0,
    totalToday: 0
  };
  
  const orderInfo = createSlice({
    name: "orderInfo",
    initialState,
    reducers: {
      wsInit: (state, action) => {
        state.wsInit = true;
      },
      connectionStart: (state) => {
        state.wsConnected = true;
      },
      connectionClose: (state) => {
        state.wsConnected = false;
        state.wsInit = false;
      },
      connectionGetData: (state, action) => {
        state.data = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      },
    }
  });

export const { reducer } = orderInfo;
export const {
  connectionStart,
  connectionClose,
  connectionGetData,
  wsInit
} = orderInfo.actions;