import React, { useState, useCallback } from 'react';
import { Switch } from 'react-native';
import { useThemedStyles } from '@/theme';
import { createThemeToggleStyles } from './theme-toggle-styles';

type ThemeToggleProps = {
  onChange?: (isDark: boolean) => void;
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ onChange }) => {
  const [isDark, setIsDark] = useState(false);
  const styles = useThemedStyles(createThemeToggleStyles);
  
  const handleToggle = useCallback((value: boolean) => {
    setIsDark(value);
    onChange?.(value);
  }, [onChange]);
  
  return (
    <Switch
      value={isDark}
      onValueChange={handleToggle}
      trackColor={{ false: styles.trackColorFalse, true: styles.trackColorTrue }}
      thumbColor={styles.thumbColor}
    />
  );
};
