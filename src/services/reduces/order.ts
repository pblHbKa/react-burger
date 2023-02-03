import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IOrder {
    number: null | number;
};

const initialState: IOrder = {
    number: null
};

export const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<number|null>) => {
            state.number = action.payload
        }
    }
});

export const { setOrder } = order.actions;
export const { reducer } = order;