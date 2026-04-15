import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { useThemedStyles } from '../theme/index';

export const Layout = ({ children }) => {
  const { colors, typography, spacing } = useThemedStyles();
  return (
    <Provider store={store}>
      <React.Fragment>
        {children}
      </React.Fragment>
    </Provider>
  );
};