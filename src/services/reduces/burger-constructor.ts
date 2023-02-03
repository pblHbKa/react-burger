import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../types/data";

interface IburgerConstructor {
  ingredients: Array<IIngredient>,
  bun: undefined | IIngredient,
}

const initialState: IburgerConstructor = {
  ingredients: [],
  bun: undefined,
};

const burgerConstructor = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Array<IIngredient>>) => {
      state.ingredients = action.payload.filter((item) => item.type !== "bun").map((item, index: number) => ({
        ...item,
        uuid: Math.random().toString(36).slice(2),
        position: index,
      }));
      state.bun = action.payload.find((item: IIngredient) => item.type === "bun");
    },
    addIngredient: (state, action: PayloadAction<IIngredient>) => {
      state.ingredients = [
        ...state.ingredients,
        {
          ...action.payload,
          uuid: Math.random().toString(36).slice(2),
        },
      ];
    },
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((item) => item.uuid !== action.payload);
    },
    moveIngredient: (state, action) => {
      const hoverIndex = action.payload.hoverIndex;
      const dragIndex = action.payload.dragIndex;
      let newArr = state.ingredients;
      newArr.splice(dragIndex, 1);
      newArr.splice(hoverIndex, 0, action.payload.item);
      state.ingredients = newArr;
    },
  },
});

export const { reducer } = burgerConstructor;
export const { setData, addIngredient, addBun, deleteIngredient, moveIngredient} =
  burgerConstructor.actions;
