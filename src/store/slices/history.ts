import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HistoryItem = {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
};

type HistoryState = {
  items: HistoryItem[];
};

const initialState: HistoryState = {
  items: []
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<Omit<HistoryItem, 'id' | 'timestamp'>>) => {
      const newItem: HistoryItem = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now()
      };
      state.items.unshift(newItem);
    },
    clearHistory: (state) => {
      state.items = [];
    },
    removeHistory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { addHistory, clearHistory, removeHistory } = historySlice.actions;
export default historySlice.reducer;