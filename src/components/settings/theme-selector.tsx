import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectTheme, setTheme } from '@/store/slices/settings';
import { Button } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createThemeSelectorStyles } from '@/styles/components/theme-selector';

export const ThemeSelector: React.FC = () => {
  const currentTheme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const styles = useThemedStyles(createThemeSelectorStyles);

  const themes = ['light', 'dark', 'auto'];

  const handleThemeSelect = useCallback((theme: string) => {
    dispatch(setTheme(theme));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme</Text>
      <View style={styles.themesContainer}>
        {themes.map((theme) => (
          <Button
            key={theme}
            title={theme.charAt(0).toUpperCase() + theme.slice(1)}
            onPress={() => handleThemeSelect(theme)}
            style={[
              styles.themeButton,
              currentTheme === theme && styles.themeButtonActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};
