import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateOrders } from '../../utils/helper'

export interface OrderState {
    bids: number[][],
    asks: number[][],
    productIds: string[],
    tick?: number
}

export interface ProductIdsState {
    productIds: string[]
}

export interface updateAsksState {
    asks: number[][]
}

export interface updateBidsState {
    bids: number[][]
}

const initialState: OrderState = {
    bids: [],
    asks: [],
    productIds: ["PI_XBTUSD"],
    tick: 0,
};

export const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        initialize: (state, action: PayloadAction<OrderState>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.bids = action.payload.bids
            state.asks = action.payload.asks
        },
        updateAsks: (state, action: PayloadAction<updateAsksState>) => {
            const asks = updateOrders(state.asks, action.payload.asks.flat())
            state.asks = asks
        },
        updateBids: (state, action: PayloadAction<updateBidsState>) => {
            const bids = updateOrders(state.bids, action.payload.bids.flat())
            state.bids = bids
        },
    },
});

// Action creators are generated for each case reducer function
export const { initialize, updateAsks, updateBids } = OrdersSlice.actions;

export default OrdersSlice.reducer;
