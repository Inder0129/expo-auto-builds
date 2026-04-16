import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './slices/calculator-slice';
import historyReducer from './slices/history-slice';
import settingsReducer from './slices/settings-slice';

export const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    history: historyReducer,
    settings: settingsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
