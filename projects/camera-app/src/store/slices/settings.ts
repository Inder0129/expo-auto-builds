import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '@/src/types';

const initialState: SettingsState = {
  saveToGallery: true,
  enableHDR: false,
  enableGrid: true,
  quality: 'high',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSaveToGallery: (state, action: PayloadAction<boolean>) => {
      state.saveToGallery = action.payload;
    },
    setEnableHDR: (state, action: PayloadAction<boolean>) => {
      state.enableHDR = action.payload;
    },
    setEnableGrid: (state, action: PayloadAction<boolean>) => {
      state.enableGrid = action.payload;
    },
    setQuality: (state, action: PayloadAction<'low' | 'medium' | 'high'>) => {
      state.quality = action.payload;
    },
  },
});

export const { setSaveToGallery, setEnableHDR, setEnableGrid, setQuality } = settingsSlice.actions;
export default settingsSlice.reducer;