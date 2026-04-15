import { createSlice } from '@reduxjs/toolkit';
interface CalculatorState { currentNumber: string; previousNumber: string; operation: string | null; }
const initialState: CalculatorState = { currentNumber: '0', previousNumber: '', operation: null, };
const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setCurrentNumber(state, action) { state.currentNumber = action.payload; },
    setPreviousNumber(state, action) { state.previousNumber = action.payload; },
    setOperation(state, action) { state.operation = action.payload; },
    clearState(state) { state.currentNumber = '0'; state.previousNumber = ''; state.operation = null; }
  }
});
export const { setCurrentNumber, setPreviousNumber, setOperation, clearState } = calculatorSlice.actions;
export default calculatorSlice.reducer;