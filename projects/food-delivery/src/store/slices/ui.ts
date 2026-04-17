import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UiState = {
  theme: 'light' | 'dark';
  isLoading: boolean;
  toast: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null;
};

const initialState: UiState = {
  theme: 'light',
  isLoading: false,
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>) => {
      state.toast = action.payload;
    },
    hideToast: (state) => {
      state.toast = null;
    },
  },
});

export const { setTheme, setLoading, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;