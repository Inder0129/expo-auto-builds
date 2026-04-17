import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalculatorState {
  display: string;
  memory: number;
  isScientific: boolean;
}

const initialState: CalculatorState = {
  display: '0',
  memory: 0,
  isScientific: false
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setDisplay: (state, action: PayloadAction<string>) => {
      state.display = action.payload;
    },
    setMemory: (state, action: PayloadAction<number>) => {
      state.memory = action.payload;
    },
    toggleScientific: (state) => {
      state.isScientific = !state.isScientific;
    }
  }
});

export const { setDisplay, setMemory, toggleScientific } = calculatorSlice.actions;
export default calculatorSlice.reducer;