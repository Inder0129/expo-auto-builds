import React, { memo, useCallback } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { toggleTheme } from '@/src/store/slices/ui';
import { colors, spacing, typography } from '@/src/theme';
import { styles } from './theme-toggle.styles';

export const ThemeToggle = memo(() => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const isDark = theme === 'dark';

  const handleToggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleToggle}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={isDark ? 'moon' : 'sunny'}
          size={24}
          color={colors.primary}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Theme</Text>
        <Text style={styles.description}>
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </View>
      <Switch
        value={isDark}
        onValueChange={handleToggle}
        trackColor={{ false: colors.border, true: colors.primary + '80' }}
        thumbColor={isDark ? colors.primary : colors.surface}
      />
    </TouchableOpacity>
  );
});
