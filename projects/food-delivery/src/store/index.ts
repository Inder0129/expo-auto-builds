import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import cartReducer from './slices/cart';
import restaurantsReducer from './slices/restaurants';
import ordersReducer from './slices/orders';
import userReducer from './slices/user';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    restaurants: restaurantsReducer,
    orders: ordersReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;