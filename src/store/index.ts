import { configureStore } from '@reduxjs/toolkit';
import calculatorSlice from './slices/calculator';
import settingsSlice from './slices/settings';
export const store = configureStore({
  reducer: {
    calculator: calculatorSlice,
    settings: settingsSlice
  }
});