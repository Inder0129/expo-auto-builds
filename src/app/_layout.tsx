import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { useThemedStyles } from '../theme/index';

export const Layout = ({ children }) => {
  const theme = useThemedStyles();
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};