import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../types/data";

interface IIngredientOpen {
  ingredient: IIngredient | null;
};

const initialState: IIngredientOpen = {
  ingredient: null,
};

export const ingredientOpen = createSlice({
  name: "ingredientOpen",
  initialState,
  reducers: {
    setIngredientOpen: (state, action: PayloadAction<IIngredient|null>) => {
      state.ingredient = action.payload;
    },
  },
});

export const { reducer } = ingredientOpen;
export const { setIngredientOpen } = ingredientOpen.actions;
