import React from 'react';
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useThemedStyles } from '@/theme';
import { createLayoutStyles } from '@/styles/layout';

export default function RootLayout() {
  const styles = useThemedStyles(createLayoutStyles);

  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
