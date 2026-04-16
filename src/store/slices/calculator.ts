import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CalculatorState = {
  display: string;
  expression: string;
  result: string;
};

const initialState: CalculatorState = {
  display: '0',
  expression: '',
  result: ''
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
    setResult: (state, action: PayloadAction<string>) => {
      state.result = action.payload;
    },
    clear: (state) => {
      state.display = '0';
      state.expression = '';
      state.result = '';
    }
  }
});

export const { setDisplay, setExpression, setResult, clear } = calculatorSlice.actions;
export default calculatorSlice.reducer;