import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  theme: 'light' | 'dark';
  isLoading: boolean;
}

const initialState: UiState = {
  theme: 'light',
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleTheme, setLoading } = uiSlice.actions;
export default uiSlice.reducer;