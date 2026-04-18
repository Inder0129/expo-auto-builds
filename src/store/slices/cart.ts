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
  deliveryFee: 2.99,
  tax: 0.08,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total = calculateTotal(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = calculateTotal(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = calculateTotal(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

function calculateTotal(state: CartState): number {
  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return subtotal + state.deliveryFee + (subtotal * state.tax);
}

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;