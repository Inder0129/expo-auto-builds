import { createSlice } from '@reduxjs/toolkit';
interface UiState {
  theme: 'light' | 'dark';
  loading: boolean;
}
const initialState: UiState = {
  theme: 'light',
  loading: false,
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});
export const { toggleTheme, setLoading } = uiSlice.actions;
export default uiSlice.reducer;