import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark' | 'auto';
type AngleMode = 'degrees' | 'radians';

interface SettingsState {
  theme: Theme;
  precision: number;
  angleMode: AngleMode;
  soundEnabled: boolean;
  hapticFeedback: boolean;
  showHistory: boolean;
  scientificMode: boolean;
}

const initialState: SettingsState = {
  theme: 'light',
  precision: 10,
  angleMode: 'degrees',
  soundEnabled: true,
  hapticFeedback: false,
  showHistory: true,
  scientificMode: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    
    setPrecision: (state, action: PayloadAction<number>) => {
      state.precision = Math.min(16, Math.max(0, action.payload));
    },
    
    setAngleMode: (state, action: PayloadAction<AngleMode>) => {
      state.angleMode = action.payload;
    },
    
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    
    toggleHapticFeedback: (state) => {
      state.hapticFeedback = !state.hapticFeedback;
    },
    
    toggleShowHistory: (state) => {
      state.showHistory = !state.showHistory;
    },
    
    toggleScientificMode: (state) => {
      state.scientificMode = !state.scientificMode;
    },
    
    resetSettings: () => {
      return initialState;
    },
    
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { 
  setTheme, 
  setPrecision, 
  setAngleMode, 
  toggleSound, 
  toggleHapticFeedback, 
  toggleShowHistory, 
  toggleScientificMode,
  resetSettings,
  updateSettings 
} = settingsSlice.actions;

export default settingsSlice.reducer;