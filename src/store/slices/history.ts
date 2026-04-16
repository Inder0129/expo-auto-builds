import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

interface HistoryState {
  entries: HistoryEntry[];
}

const initialState: HistoryState = {
  entries: []
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<Omit<HistoryEntry, 'id' | 'timestamp'>>) => {
      const entry: HistoryEntry = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now()
      };
      state.entries.unshift(entry);
    },
    clearHistory: (state) => {
      state.entries = [];
    }
  }
});

export const { addEntry, clearHistory } = historySlice.actions;
export default historySlice.reducer;
