import { createSlice } from '@reduxjs/toolkit';

interface CalculatorState {
  result: number;
}

const initialState: CalculatorState = {
  result: 0,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    calculate: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { calculate } = calculatorSlice.actions;
export default calculatorSlice.reducer;