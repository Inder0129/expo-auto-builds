import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  theme: 'light' | 'dark';
  vibration: boolean;
  sound: boolean;
}

const initialState: SettingsState = {
  theme: 'light',
  vibration: true,
  sound: true
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleVibration: (state) => {
      state.vibration = !state.vibration;
    },
    toggleSound: (state) => {
      state.sound = !state.sound;
    }
  }
});

export const { setTheme, toggleVibration, toggleSound } = settingsSlice.actions;
export default settingsSlice.reducer;