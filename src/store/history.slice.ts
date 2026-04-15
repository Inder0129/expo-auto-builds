import { createSlice } from '@reduxjs/toolkit';
interface HistoryState { calculations: { num1: string; num2: string; operation: string; result: string; }[]; }
const initialState: HistoryState = { calculations: [] };
const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addCalculation(state, action) { state.calculations.push(action.payload); },
    clearHistory(state) { state.calculations = []; }
  }
});
export const { addCalculation, clearHistory } = historySlice.actions;
export default historySlice.reducer;