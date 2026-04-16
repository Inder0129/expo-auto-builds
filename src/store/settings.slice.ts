import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  decimalPlaces: number;
}

const initialState: SettingsState = {
  decimalPlaces: 2,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDecimalPlaces(state, action) {
      state.decimalPlaces = action.payload;
    },
  },
});

export const { setDecimalPlaces } = settingsSlice.actions;
export default settingsSlice.reducer;