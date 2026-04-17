import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalculationHistory } from '../types';

type CalculatorState = {
  displayValue: string;
  history: CalculationHistory[];
};

const initialState: CalculatorState = {
  displayValue: '0',
  history: [],
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setDisplayValue: (state, action: PayloadAction<string>) => {
      state.displayValue = action.payload;
    },
    addToHistory: (state, action: PayloadAction<CalculationHistory>) => {
      state.history.unshift(action.payload);
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { setDisplayValue, addToHistory, clearHistory } = calculatorSlice.actions;
export default calculatorSlice.reducer;
