import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HistoryItem = {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
};

type CalculatorState = {
  display: string;
  operation: string;
  previousValue: string;
  history: HistoryItem[];
};

const initialState: CalculatorState = {
  display: '',
  operation: '',
  previousValue: '',
  history: [],
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    append: (state, action: PayloadAction<string>) => {
      state.display += action.payload;
    },
    clear: (state) => {
      state.display = '';
      state.operation = '';
      state.previousValue = '';
    },
    setOperation: (state, action: PayloadAction<string>) => {
      if (state.display) {
        state.previousValue = state.display;
        state.display = '';
      }
      state.operation = action.payload;
    },
    calculate: (state) => {
      if (!state.previousValue || !state.display || !state.operation) return;

      const prev = parseFloat(state.previousValue);
      const current = parseFloat(state.display);
      let result = 0;

      switch (state.operation) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '×':
          result = prev * current;
          break;
        case '÷':
          result = prev / current;
          break;
        default:
          result = current;
      }

      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        expression: `${state.previousValue} ${state.operation} ${state.display}`,
        result: result.toString(),
        timestamp: new Date().toLocaleTimeString(),
      };

      state.history.unshift(historyItem);
      if (state.history.length > 50) state.history.pop();

      state.display = result.toString();
      state.operation = '';
      state.previousValue = '';
    },
  },
});

export const { append, clear, setOperation, calculate } = calculatorSlice.actions;
export default calculatorSlice.reducer;