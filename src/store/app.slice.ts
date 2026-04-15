import { createSlice } from '@reduxjs/toolkit';
interface AppState { calculatorVisible: boolean; }
const initialState: AppState = { calculatorVisible: true };
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCalculatorVisible(state, action) { state.calculatorVisible = action.payload; }
  }
});
export const { setCalculatorVisible } = appSlice.actions;
export default appSlice.reducer;