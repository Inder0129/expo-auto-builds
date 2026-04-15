import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: string | null;
  waitingForOperand: boolean;
}

const initialState: CalculatorState = {
  currentValue: '0',
  previousValue: '',
  operation: null,
  waitingForOperand: false,
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    inputDigit: (state, action: PayloadAction<string>) => {
      const digit = action.payload;
      
      if (state.waitingForOperand) {
        state.currentValue = digit;
        state.waitingForOperand = false;
      } else {
        state.currentValue = state.currentValue === '0' ? digit : state.currentValue + digit;
      }
    },
    
    inputDecimal: (state) => {
      if (state.waitingForOperand) {
        state.currentValue = '0.';
        state.waitingForOperand = false;
      } else if (!state.currentValue.includes('.')) {
        state.currentValue += '.';
      }
    },
    
    inputOperator: (state, action: PayloadAction<string>) => {
      const nextOperation = action.payload;
      
      if (state.operation && !state.waitingForOperand) {
        const inputValue = parseFloat(state.currentValue);
        const prevValue = parseFloat(state.previousValue);
        let result: number;
        
        switch (state.operation) {
          case '+':
            result = prevValue + inputValue;
            break;
          case '-':
            result = prevValue - inputValue;
            break;
          case '×':
            result = prevValue * inputValue;
            break;
          case '÷':
            result = prevValue / inputValue;
            break;
          default:
            result = inputValue;
        }
        
        state.currentValue = String(result);
        state.previousValue = '';
      } else {
        state.previousValue = state.currentValue;
      }
      
      state.operation = nextOperation;
      state.waitingForOperand = true;
    },
    
    calculate: (state) => {
      if (!state.operation || state.waitingForOperand) {
        return;
      }
      
      const inputValue = parseFloat(state.currentValue);
      const prevValue = parseFloat(state.previousValue);
      let result: number;
      
      switch (state.operation) {
        case '+':
          result = prevValue + inputValue;
          break;
        case '-':
          result = prevValue - inputValue;
          break;
        case '×':
          result = prevValue * inputValue;
          break;
        case '÷':
          result = prevValue / inputValue;
          break;
        default:
          result = inputValue;
      }
      
      state.currentValue = String(result);
      state.previousValue = '';
      state.operation = null;
      state.waitingForOperand = true;
    },
    
    clearDisplay: (state) => {
      state.currentValue = '0';
      state.waitingForOperand = false;
    },
    
    clearAll: (state) => {
      state.currentValue = '0';
      state.previousValue = '';
      state.operation = null;
      state.waitingForOperand = false;
    },
    
    deleteLastDigit: (state) => {
      if (state.currentValue.length > 1) {
        state.currentValue = state.currentValue.slice(0, -1);
      } else {
        state.currentValue = '0';
      }
    },
    
    setCurrentValue: (state, action: PayloadAction<string>) => {
      state.currentValue = action.payload;
      state.waitingForOperand = false;
    },
  },
});

export const { 
  inputDigit, 
  inputDecimal, 
  inputOperator, 
  calculate, 
  clearDisplay, 
  clearAll, 
  deleteLastDigit,
  setCurrentValue 
} = calculatorSlice.actions;

export default calculatorSlice.reducer;