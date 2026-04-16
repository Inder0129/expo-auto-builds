import React from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Button } from '@/components/ui';
import { useSettings } from '@/store/hooks';
import { createThemeSelectorStyles } from './theme-selector.styles';

type ThemeSelectorProps = {};

export const ThemeSelector: React.FC<ThemeSelectorProps> = () => {
  const styles = useThemedStyles(createThemeSelectorStyles);
  const { theme, setTheme } = useSettings();

  const themes = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'system', label: 'System' },
  ];

  return (
    <View style={styles.container}>
      {themes.map((t) => (
        <Button
          key={t.id}
          title={t.label}
          type={theme === t.id ? 'primary' : 'default'}
          onPress={() => setTheme(t.id)}
          style={styles.button}
        />
      ))}
    </View>
  );
};
