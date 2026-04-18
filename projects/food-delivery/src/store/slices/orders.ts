import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/src/types';

interface OrdersState {
  orders: Order[];
  activeOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  activeOrder: null,
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state: OrdersState, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    setActiveOrder(state: OrdersState, action: PayloadAction<Order | null>) {
      state.activeOrder = action.payload;
    },
    addOrder(state: OrdersState, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload);
    },
    setLoading(state: OrdersState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state: OrdersState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setOrders, setActiveOrder, addOrder, setLoading, setError } = ordersSlice.actions;
export default ordersSlice.reducer;