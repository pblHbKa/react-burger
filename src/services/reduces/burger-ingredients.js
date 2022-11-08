import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const burgerIngredients = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.data = action.payload.map((item) => ({ ...item, count: 0 }));
    },
    increaseCount: (state, action) => {
      state.data.forEach((item) => {
        if (item._id === action.payload) {
          item.type === "bun" ? (item.count = 1) : (item.count += 1);
        }
      });
    },
    decreaseCount: (state, action) => {
      state.data.forEach((item) => {
        if (item._id === action.payload) {
          item.count -= 1;
        }
      });
    },
    bunChange: (state, action) => {
      state.data.forEach((item) => {
        if ((item.type === "bun") & (item._id !== action.payload)) {
          item.count = 0;
        }
      });
    },
  },
});

export const { reducer } = burgerIngredients;
export const { setIngredients, increaseCount, decreaseCount, bunChange } =
  burgerIngredients.actions;
