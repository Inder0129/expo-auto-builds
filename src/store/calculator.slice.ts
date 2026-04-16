import { createSlice } from '@reduxjs/toolkit';
interface CalculatorState {
  currentNumber: string;
  previousNumber: string;
  operation: string;
}
const initialState: CalculatorState = {
  currentNumber: '0',
  previousNumber: '',
  operation: '',
};
const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    updateCurrentNumber(state, action) {
      state.currentNumber = action.payload;
    },
    updatePreviousNumber(state, action) {
      state.previousNumber = action.payload;
    },
    updateOperation(state, action) {
      state.operation = action.payload;
    },
    resetCalculator(state) {
      state.currentNumber = '0';
      state.previousNumber = '';
      state.operation = '';
    },
  },
});
export const { updateCurrentNumber, updatePreviousNumber, updateOperation, resetCalculator } = calculatorSlice.actions;
export default calculatorSlice.reducer;