import { createSlice } from '@reduxjs/toolkit';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';

const initialState = {
    data: []
};

const burgerIngredients = createSlice({
    name: 'burgerIngredients',
    initialState,
    reducers: {
        setIngredients: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const {reducer} = burgerIngredients;
export const {setIngredients} = burgerIngredients.actions;