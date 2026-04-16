import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { useThemedStyles } from '../theme/index';
export default function AppLayout({ children }) {
  const styles = useThemedStyles();
  return (
    <Provider store={store}>
      <div style={styles.container}>{children}</div>
    </Provider>
  );}