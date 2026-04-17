import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/src/theme';
import { Text } from '@/src/components/ui';
import { createThemeSwitcherStyles } from '@/src/components/settings/theme-switcher.styles';

type ThemeSwitcherProps = {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const colors = useThemeColors();
  const styles = createThemeSwitcherStyles(colors);

  const themes = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'auto', label: 'Auto' },
  ];

  const handleThemePress = useCallback((themeId: string) => {
    onThemeChange(themeId);
  }, [onThemeChange]);

  return (
    <View style={styles.container}>
      {themes.map((theme) => (
        <TouchableOpacity
          key={theme.id}
          style={[
            styles.themeOption,
            currentTheme === theme.id && styles.themeOptionActive,
          ]}
          onPress={() => handleThemePress(theme.id)}
          activeOpacity={0.7}
        >
          <View style={[
            styles.radioOuter,
            currentTheme === theme.id && styles.radioOuterActive,
          ]}>
            {currentTheme === theme.id && (
              <View style={styles.radioInner} />
            )}
          </View>
          <Text style={styles.themeLabel}>{theme.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
