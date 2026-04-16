import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  theme: 'light' | 'dark';
  decimalPlaces: number;
  vibration: boolean;
}

const initialState: SettingsState = {
  theme: 'light',
  decimalPlaces: 2,
  vibration: true
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setDecimalPlaces: (state, action: PayloadAction<number>) => {
      state.decimalPlaces = action.payload;
    },
    setVibration: (state, action: PayloadAction<boolean>) => {
      state.vibration = action.payload;
    }
  }
});

export const { setTheme, setDecimalPlaces, setVibration } = settingsSlice.actions;
export default settingsSlice.reducer;
