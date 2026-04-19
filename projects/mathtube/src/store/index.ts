import { configureStore } from '@reduxjs/toolkit';
import conceptsReducer from './slices/concepts';
import videosReducer from './slices/videos';
import bookmarksReducer from './slices/bookmarks';

export const store = configureStore({
  reducer: {
    concepts: conceptsReducer,
    videos: videosReducer,
    bookmarks: bookmarksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;