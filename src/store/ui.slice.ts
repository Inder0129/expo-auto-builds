import { createSlice } from '@reduxjs/toolkit';
interface UiState { theme: 'light' | 'dark'; isLoading: boolean; }
const initialState: UiState = { theme: 'light', isLoading: false };
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action) { state.theme = action.payload; },
    setLoading(state, action) { state.isLoading = action.payload; }
  }
});
export const { setTheme, setLoading } = uiSlice.actions;
export default uiSlice.reducer;