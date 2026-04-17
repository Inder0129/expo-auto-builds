import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import uiReducer from './slices/ui';
import studyReducer from './slices/study';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    study: studyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
