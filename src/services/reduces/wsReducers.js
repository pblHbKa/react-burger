import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
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
      connectionStart: (state, action) => {
        state.wsConnected = true;
      },
      connectionClose: (state, action) => {
        state.wsConnected = false;
        state.data = [];
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