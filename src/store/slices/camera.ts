import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CameraState } from '@/src/types';

const initialState: CameraState = {
  isActive: false,
  flashMode: 'off',
  cameraType: 'back',
  zoom: 1,
};

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setFlashMode: (state, action: PayloadAction<'off' | 'on' | 'auto'>) => {
      state.flashMode = action.payload;
    },
    setCameraType: (state, action: PayloadAction<'front' | 'back'>) => {
      state.cameraType = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
  },
});

export const { setActive, setFlashMode, setCameraType, setZoom } = cameraSlice.actions;
export default cameraSlice.reducer;