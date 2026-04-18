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
    addItem(state: CartState, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find((item: CartItem) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem(state: CartState, action: PayloadAction<string>) {
      state.items = state.items.filter((item: CartItem) => item.id !== action.payload);
    },
    updateQuantity(state: CartState, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((item: CartItem) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state: CartState) {
      state.items = [];
      state.total = 0;
    },
    calculateTotal(state: CartState) {
      state.total = state.items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;