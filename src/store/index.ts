import { configureStore } from '@reduxjs/toolkit';
import { calc } from './calc';
import { history } from './history';

export const store = configureStore({
  reducer: {
    calc,
    history
  }
});