import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/src/types';

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { setOrders, addOrder, clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;