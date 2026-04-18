import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/src/types';

interface CartState {
  items: CartItem[];
  total: number;
  deliveryFee: number;
  tax: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  deliveryFee: 0,
  tax: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item: CartItem) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item: CartItem) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item: CartItem) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.deliveryFee = 0;
      state.tax = 0;
    },
    updateTotal: (state) => {
      state.total = state.items.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, updateTotal } = cartSlice.actions;
export default cartSlice.reducer;