import { createSlice } from '@reduxjs/toolkit';
interface AppState {
  isCalculatorOpen: boolean;
}
const initialState: AppState = {
  isCalculatorOpen: false,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openCalculator(state) {
      state.isCalculatorOpen = true;
    },
    closeCalculator(state) {
      state.isCalculatorOpen = false;
    },
  },
});
export const { openCalculator, closeCalculator } = appSlice.actions;
export default appSlice.reducer;