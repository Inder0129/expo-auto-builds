import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/src/types';

interface OrdersState {
  orders: Order[];
  activeOrders: Order[];
  pastOrders: Order[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  activeOrders: [],
  pastOrders: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setActiveOrders: (state, action: PayloadAction<Order[]>) => {
      state.activeOrders = action.payload;
    },
    setPastOrders: (state, action: PayloadAction<Order[]>) => {
      state.pastOrders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.activeOrders.unshift(action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const order = state.orders.find((order: Order) => order.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setOrders,
  setActiveOrders,
  setPastOrders,
  addOrder,
  updateOrderStatus,
  setLoading,
  setError,
} = ordersSlice.actions;
export default ordersSlice.reducer;