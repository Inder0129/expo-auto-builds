import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useDispatch, useSelector } from '@/src/store/hooks';
import { toggleTheme } from '@/src/store/slices/settings';
import { useThemeColors } from '@/src/theme';
import { typography } from '@/src/theme/typography';

export const ThemeSwitcher: React.FC = () => {
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.settings);

  const isDark = theme === 'dark';

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={[typography.body, { color: colors.textPrimary }]}>
        Dark Mode
      </Text>
      <Switch
        value={isDark}
        onValueChange={() => dispatch(toggleTheme())}
        trackColor={{ false: colors.surface, true: colors.primary }}
        thumbColor={colors.onPrimary}
      />
    </View>
  );
};
