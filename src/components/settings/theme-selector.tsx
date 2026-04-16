import React, { useCallback } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Button } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { settingsActions } from '@/store/slices/settings';
import { createThemeSelectorStyles } from './theme-selector.styles';

type ThemeSelectorProps = {
  style?: ViewStyle;
};

export function ThemeSelector({ style }: ThemeSelectorProps) {
  const styles = useThemedStyles(createThemeSelectorStyles);
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.settings);

  const themes = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'auto', label: 'Auto' },
  ];

  const handleThemeChange = useCallback(
    (themeId: string) => {
      dispatch(settingsActions.setTheme(themeId));
    },
    [dispatch]
  );

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Theme</Text>
      <View style={styles.themes}>
        {themes.map((t) => (
          <Button
            key={t.id}
            title={t.label}
            onPress={() => handleThemeChange(t.id)}
            style={[styles.themeButton, theme === t.id && styles.themeButtonActive]}
            textStyle={[
              styles.themeButtonText,
              theme === t.id && styles.themeButtonTextActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}
