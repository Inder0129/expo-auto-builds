import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalculatorState {
  display: string;
  expression: string;
}

const initialState: CalculatorState = {
  display: '0',
  expression: ''
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setDisplay: (state, action: PayloadAction<string>) => {
      state.display = action.payload;
    },
    setExpression: (state, action: PayloadAction<string>) => {
      state.expression = action.payload;
    },
    clear: (state) => {
      state.display = '0';
      state.expression = '';
    }
  }
});

export const { setDisplay, setExpression, clear } = calculatorSlice.actions;
export default calculatorSlice.reducer;