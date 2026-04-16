import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark' | 'auto';
type NumberFormat = 'decimal' | 'comma';

type SettingsState = {
  theme: ThemeMode;
  numberFormat: NumberFormat;
  vibration: boolean;
  sound: boolean;
};

const initialState: SettingsState = {
  theme: 'auto',
  numberFormat: 'decimal',
  vibration: true,
  sound: true
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
    setNumberFormat: (state, action: PayloadAction<NumberFormat>) => {
      state.numberFormat = action.payload;
    },
    setVibration: (state, action: PayloadAction<boolean>) => {
      state.vibration = action.payload;
    },
    setSound: (state, action: PayloadAction<boolean>) => {
      state.sound = action.payload;
    }
  }
});

export const { setTheme, setNumberFormat, setVibration, setSound } = settingsSlice.actions;
export default settingsSlice.reducer;