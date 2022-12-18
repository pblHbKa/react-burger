import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    name: "",
    password: "",
  },
  canResetPassword: false,
};

const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
    },

    clearUserInfo: (state, action) => {
      state.user.email = "";
      state.user.name = "";
    },

    canResetPassword: (state, action) => {
      state.canResetPassword = action.payload;
    },
  },
});

export const { reducer } = userInfo;
export const {
  canResetPassword,
  setUserInfo,
  clearUserInfo
} = userInfo.actions;
