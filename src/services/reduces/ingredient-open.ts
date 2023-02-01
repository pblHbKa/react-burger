import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "../types/data";

interface IIngredientOpen {
  ingredient: TIngredient | null;
};

const initialState: IIngredientOpen = {
  ingredient: null,
};

export const ingredientOpen = createSlice({
  name: "ingredientOpen",
  initialState,
  reducers: {
    setIngredientOpen: (state, action: PayloadAction<TIngredient|null>) => {
      state.ingredient = action.payload;
    },
  },
});

export const { reducer } = ingredientOpen;
export const { setIngredientOpen } = ingredientOpen.actions;
