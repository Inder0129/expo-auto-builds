import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useThemedStyles } from '@/theme';
import { createIndexStyles } from '@/styles/index';

export default function IndexScreen() {
  const styles = useThemedStyles(createIndexStyles);

  useEffect(() => {
    // No-op for now
  }, []);

  return <Redirect href="/(tabs)/calculator" />;
}
