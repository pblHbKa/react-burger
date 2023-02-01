import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserInfo } from "../types/data";

interface IUserInfo {
  user: TUserInfo;
  canResetPassword: boolean;
};

const initialState: IUserInfo = {
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
