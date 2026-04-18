import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/src/types';

interface OrdersState {
  list: Order[];
  current: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  list: [],
  current: null,
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.list = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.list.unshift(action.payload);
    },
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.current = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setOrders, addOrder, setCurrentOrder, setLoading, setError } =
  ordersSlice.actions;
export default ordersSlice.reducer;