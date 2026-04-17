import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: string;
};

type OrdersState = {
  list: Order[];
  current: Order | null;
  isLoading: boolean;
  error: string | null;
};

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
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.list.find((order: Order) => order.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
      if (state.current && state.current.id === action.payload.id) {
        state.current.status = action.payload.status;
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

export const { setOrders, addOrder, setCurrentOrder, updateOrderStatus, setLoading, setError } = ordersSlice.actions;
export default ordersSlice.reducer;