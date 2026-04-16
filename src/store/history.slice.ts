import { createSlice } from '@reduxjs/toolkit';

interface HistoryState {
  records: { num1: string; operation: string; num2: string; result: string }[];
}

const initialState: HistoryState = {
  records: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addRecord(state, action) {
      state.records.push(action.payload);
    },
    clearRecords(state) {
      state.records = [];
    },
  },
});

export const { addRecord, clearRecords } = historySlice.actions;
export default historySlice.reducer;