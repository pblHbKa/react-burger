import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInfo } from "../types/data";

interface IUserInfoState {
  user: IUserInfo;
  canResetPassword: boolean;
};

const initialState: IUserInfoState = {
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
    setUserInfo: (state, action: PayloadAction<{email:string, name:string}>) => {
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
    },

    clearUserInfo: (state) => {
      state.user.email = "";
      state.user.name = "";
    },

    canResetPassword: (state, action: PayloadAction<boolean>) => {
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
