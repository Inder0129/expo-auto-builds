import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Text, Button } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createSettingsStyles } from '@/styles/settings';

type ThemeSelectorProps = {};

type Theme = {
  id: string;
  name: string;
};

export const ThemeSelector: React.FC<ThemeSelectorProps> = () => {
  const styles = useThemedStyles(createSettingsStyles);

  const themes: Theme[] = [
    { id: 'light', name: 'Light' },
    { id: 'dark', name: 'Dark' },
    { id: 'auto', name: 'Auto' },
  ];

  const handleThemeSelect = useCallback((themeId: string) => {
    // Theme selection handler
  }, []);

  return (
    <View style={styles.section}>
      <Text type="h3">Theme</Text>
      <View style={styles.themeButtons}>
        {themes.map((theme) => (
          <Button
            key={theme.id}
            title={theme.name}
            onPress={() => handleThemeSelect(theme.id)}
            style={styles.themeButton}
          />
        ))}
      </View>
    </View>
  );
};
