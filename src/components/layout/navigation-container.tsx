import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useThemeColors } from '@/src/theme';

type AppNavigationContainerProps = {
  children: React.ReactNode;
};

export function AppNavigationContainer({ children }: AppNavigationContainerProps) {
  const colors = useThemeColors();
  
  return (
    <NavigationContainer
      theme={{
        dark: colors.mode === 'dark',
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          notification: colors.notification,
        },
      }}
    >
      {children}
    </NavigationContainer>
  );
}
