import { configureStore } from '@reduxjs/toolkit'; import calculatorReducer from './calculator.slice'; import uiReducer from './ui.slice';

const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    ui: uiReducer,
  },
});

export default store;