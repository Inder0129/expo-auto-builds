import { configureStore } from '@reduxjs/toolkit';
import calculator from './slices/calculator';
import history from './slices/history';

export const store = configureStore({
  reducer: {
    calculator,
    history,
  },
});