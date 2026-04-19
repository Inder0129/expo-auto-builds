import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './slices/camera';
import galleryReducer from './slices/gallery';
import settingsReducer from './slices/settings';

export const store = configureStore({
  reducer: {
    camera: cameraReducer,
    gallery: galleryReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;