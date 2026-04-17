import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './slices/gallery';
import selectionReducer from './slices/selection';
import uiReducer from './slices/ui';

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    selection: selectionReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;