import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "../types/data";

interface IBurgerIngredients {
  data: Array<TIngredient>;
};

const initialState: IBurgerIngredients = {
  data: [],
};

const burgerIngredients = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<Array<TIngredient>>) => {
      state.data = action.payload.map((item) => ({ ...item, count: 0 }));
    },
    increaseCount: (state, action: PayloadAction<string>) => {
      state.data.forEach((item) => {
        if (item._id === action.payload) {
          item.type === "bun" ? (item.count = 1) : (item.count += 1);
        }
      });
    },
    decreaseCount: (state, action: PayloadAction<string>) => {
      state.data.forEach((item) => {
        if (item._id === action.payload) {
          item.count -= 1;
        }
      });
    },
    bunChange: (state, action: PayloadAction<string>) => {
      state.data.forEach((item) => {
        if ((item.type === "bun") && (item._id !== action.payload)) {
          item.count = 0;
        }
      });
    },
    resetCount: (state) => {
      state.data.forEach((item) => {
        item.count = 0;
      });
    },
  },
});

export const { reducer } = burgerIngredients;
export const { setIngredients, increaseCount, decreaseCount, bunChange, resetCount } =
  burgerIngredients.actions;
