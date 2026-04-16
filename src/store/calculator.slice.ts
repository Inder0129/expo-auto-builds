import { createSlice } from '@reduxjs/toolkit';

interface CalculatorState {
  currentNumber: string;
  previousNumber: string;
  operation: string | null;
}

const initialState: CalculatorState = {
  currentNumber: '0',
  previousNumber: '',
  operation: null,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    appendNumber(state, action) {
      if (state.currentNumber === '0' && action.payload !== '.') {
        state.currentNumber = action.payload;
      } else {
        state.currentNumber += action.payload;
      }
    },
    chooseOperation(state, action) {
      if (state.currentNumber !== '0') {
        state.operation = action.payload;
        state.previousNumber = state.currentNumber;
        state.currentNumber = '0';
      }
    },
    calculate(state) {
      if (state.operation && state.previousNumber !== '') {
        const prev = parseFloat(state.previousNumber);
        const curr = parseFloat(state.currentNumber);
        switch (state.operation) {
          case '+':
            state.currentNumber = (prev + curr).toString();
            break;
          case '-':
            state.currentNumber = (prev - curr).toString();
            break;
          case '*':
            state.currentNumber = (prev * curr).toString();
            break;
          case '/':
            state.currentNumber = (prev / curr).toString();
            break;
          default:
            return;
        }
        state.operation = null;
        state.previousNumber = '';
      }
    },
    clear(state) {
      state.currentNumber = '0';
      state.previousNumber = '';
      state.operation = null;
    },
  },
});

export const { appendNumber, chooseOperation, calculate, clear } = calculatorSlice.actions;
export default calculatorSlice.reducer;