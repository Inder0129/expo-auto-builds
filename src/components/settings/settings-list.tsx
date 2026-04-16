import React, { useCallback } from 'react';
import { Switch, Text, View, ViewStyle } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Card } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { settingsActions } from '@/store/slices/settings';
import { createSettingsListStyles } from './settings-list.styles';

type SettingsListProps = {
  style?: ViewStyle;
};

export function SettingsList({ style }: SettingsListProps) {
  const styles = useThemedStyles(createSettingsListStyles);
  const dispatch = useAppDispatch();
  const { showHistory, hapticFeedback } = useAppSelector((state) => state.settings);

  const toggleShowHistory = useCallback(() => {
    dispatch(settingsActions.toggleShowHistory());
  }, [dispatch]);

  const toggleHapticFeedback = useCallback(() => {
    dispatch(settingsActions.toggleHapticFeedback());
  }, [dispatch]);

  const settings = [
    {
      label: 'Show History Panel',
      value: showHistory,
      onToggle: toggleShowHistory,
    },
    {
      label: 'Haptic Feedback',
      value: hapticFeedback,
      onToggle: toggleHapticFeedback,
    },
  ];

  return (
    <View style={[styles.container, style]}>
      {settings.map((setting, index) => (
        <Card key={index} style={styles.setting}>
          <Text style={styles.settingLabel}>{setting.label}</Text>
          <Switch
            value={setting.value}
            onValueChange={setting.onToggle}
            trackColor={{ false: colors.surfaceVariant, true: colors.primary }}
            thumbColor={colors.onPrimary}
          />
        </Card>
      ))}
    </View>
  );
}
