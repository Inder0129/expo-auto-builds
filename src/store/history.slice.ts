import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Calculation {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

interface HistoryState {
  calculations: Calculation[];
  maxHistoryLength: number;
}

const initialState: HistoryState = {
  calculations: [],
  maxHistoryLength: 100,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addCalculation: (state, action: PayloadAction<{ expression: string; result: string }>) => {
      const { expression, result } = action.payload;
      const newCalculation: Calculation = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        expression,
        result,
        timestamp: Date.now(),
      };
      
      state.calculations.unshift(newCalculation);
      
      if (state.calculations.length > state.maxHistoryLength) {
        state.calculations = state.calculations.slice(0, state.maxHistoryLength);
      }
    },
    
    clearHistory: (state) => {
      state.calculations = [];
    },
    
    deleteCalculation: (state, action: PayloadAction<string>) => {
      state.calculations = state.calculations.filter(
        calc => calc.id !== action.payload
      );
    },
    
    setMaxHistoryLength: (state, action: PayloadAction<number>) => {
      const newMax = action.payload;
      state.maxHistoryLength = newMax;
      
      if (state.calculations.length > newMax) {
        state.calculations = state.calculations.slice(0, newMax);
      }
    },
  },
});

export const { addCalculation, clearHistory, deleteCalculation, setMaxHistoryLength } = historySlice.actions;
export default historySlice.reducer;