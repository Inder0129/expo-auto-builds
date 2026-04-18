import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/src/types';

interface CartState {
  items: CartItem[];
  total: number;
  restaurantId: string | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  restaurantId: null,
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
      state.total = state.items.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      );
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item: CartItem) => item.id !== action.payload
      );
      state.total = state.items.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item: CartItem) => item.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.total = state.items.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.restaurantId = null;
    },
    setRestaurant: (state, action: PayloadAction<string>) => {
      state.restaurantId = action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, setRestaurant } =
  cartSlice.actions;
export default cartSlice.reducer;