import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    number: null
};

export const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.number = action.payload
        }
    }
});

export const { setOrder } = order.actions;
export const { reducer } = order;