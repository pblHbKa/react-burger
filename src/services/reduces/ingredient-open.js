import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: null,
};

export const ingredientOpen = createSlice({
  name: "ingredientOpen",
  initialState,
  reducers: {
    setIngredientOpen: (state, action) => {
      state.ingredient = action.payload;
    },
  },
});

export const { reducer } = ingredientOpen;
export const { setIngredientOpen } = ingredientOpen.actions;
