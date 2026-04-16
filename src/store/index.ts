import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './slices/calculatorSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    settings: settingsReducer
  }
});