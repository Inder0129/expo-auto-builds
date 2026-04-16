import { createSlice } from '@reduxjs/toolkit';

interface CalcState {
  currentNumber: string;
  previousNumber: string;
  operation: string;
}

const initialState: CalcState = {
  currentNumber: '0',
  previousNumber: '',
  operation: '',
};

const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    enterNumber(state, action) {
      state.currentNumber += action.payload;
    },
    clearCurrentNumber(state) {
      state.currentNumber = '0';
    },
    setOperation(state, action) {
      state.operation = action.payload;
    },
    calculateResult(state) {
      if (state.operation === '+') {
        state.currentNumber = (parseFloat(state.previousNumber) + parseFloat(state.currentNumber)).toString();
      } else if (state.operation === '-') {
        state.currentNumber = (parseFloat(state.previousNumber) - parseFloat(state.currentNumber)).toString();
      } else if (state.operation === '*') {
        state.currentNumber = (parseFloat(state.previousNumber) * parseFloat(state.currentNumber)).toString();
      } else if (state.operation === '/') {
        state.currentNumber = (parseFloat(state.previousNumber) / parseFloat(state.currentNumber)).toString();
      }
    },
    setPreviousNumber(state) {
      state.previousNumber = state.currentNumber;
      state.currentNumber = '0';
    },
  },
});

export const { enterNumber, clearCurrentNumber, setOperation, calculateResult, setPreviousNumber } = calcSlice.actions;
export default calcSlice.reducer;