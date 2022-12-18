import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState = {
  data: [],
};

const burgerConstructor = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.map((item, index) => ({
        ...item,
        uuid: Math.random().toString(36).slice(2),
        position: index,
      }));
    },
    addIngredient: (state, action) => {
      if (action.payload.type === "bun") {
        state.data = state.data.filter((item) => item.type !== "bun");
      }
      state.data = [
        ...state.data,
        {
          ...action.payload,
          uuid: Math.random().toString(36).slice(2),
          position: state.data.length,
        },
      ];
    },
    deleteIngredient: (state, action) => {
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    moveIngredient: (state, action) => {
      const hoverIndex = action.payload.hoverIndex;
      const dragIndex = action.payload.dragIndex;
      let newArr = state.data;
      newArr.splice(dragIndex, 1);
      newArr.splice(hoverIndex, 0, action.payload.item);
      state.data = newArr;
    },
  },
});

export const { reducer } = burgerConstructor;
export const { setData, addIngredient, deleteIngredient, moveIngredient} =
  burgerConstructor.actions;
