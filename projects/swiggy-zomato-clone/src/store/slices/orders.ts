import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types';

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [
    {
      id: '1',
      restaurantId: '1',
      restaurantName: 'Pizza Palace',
      items: [
        { id: '1', name: 'Margherita Pizza', price: 12.99, quantity: 1, restaurantId: '1', restaurantName: 'Pizza Palace' },
        { id: '2', name: 'Garlic Bread', price: 4.99, quantity: 2, restaurantId: '1', restaurantName: 'Pizza Palace' },
      ],
      totalAmount: 22.97,
      status: 'delivered',
      date: '2024-01-15',
    },
    {
      id: '2',
      restaurantId: '2',
      restaurantName: 'Burger King',
      items: [
        { id: '3', name: 'Whopper', price: 8.99, quantity: 1, restaurantId: '2', restaurantName: 'Burger King' },
      ],
      totalAmount: 8.99,
      status: 'on_the_way',
      date: '2024-01-16',
    },
  ],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.orders.find(order => order.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const { addOrder, updateOrderStatus } = ordersSlice.actions;
export const selectOrders = (state: { orders: OrdersState }) => state.orders.orders;
export default ordersSlice.reducer;