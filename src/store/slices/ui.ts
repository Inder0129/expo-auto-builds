import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  gridColumns: number;
}

const initialState: UIState = {
  theme: 'light',
  gridColumns: 2,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setGridColumns: (state, action: PayloadAction<number>) => {
      state.gridColumns = action.payload;
    },
  },
});

export const { toggleTheme, setGridColumns } = uiSlice.actions;
export default uiSlice.reducer;