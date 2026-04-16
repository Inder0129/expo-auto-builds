import { View, Text, Switch } from 'react-native';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectTheme, toggleTheme } from '@/store/slices/settings';
import { Card } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createSettingsStyles } from '@/styles/screens/settings';

export default function SettingsScreen() {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const styles = useThemedStyles(createSettingsStyles);

  const handleThemeToggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Dark Theme</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={handleThemeToggle}
          />
        </View>
      </Card>
    </View>
  );
}
