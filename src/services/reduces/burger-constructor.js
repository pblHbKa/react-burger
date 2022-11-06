import { createSlice } from '@reduxjs/toolkit';
import { data as burgerConstructorData } from "../../utils/data";

const initialState = {
    data: burgerConstructorData
};

const burgerConstructor = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const {reducer} = burgerConstructor;
export const {setData} = burgerConstructor.actions;