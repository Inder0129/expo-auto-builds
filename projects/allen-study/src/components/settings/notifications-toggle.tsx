import React, { memo, useCallback } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { toggleNotifications } from '@/src/store/slices/ui';
import { colors, spacing, typography } from '@/src/theme';
import { styles } from './notifications-toggle.styles';

export const NotificationsToggle = memo(() => {
  const dispatch = useAppDispatch();
  const notificationsEnabled = useAppSelector(
    (state) => state.ui.notificationsEnabled
  );

  const handleToggle = useCallback(() => {
    dispatch(toggleNotifications());
  }, [dispatch]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleToggle}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={notificationsEnabled ? 'notifications' : 'notifications-off'}
          size={24}
          color={colors.primary}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.description}>
          {notificationsEnabled ? 'Enabled' : 'Disabled'}
        </Text>
      </View>
      <Switch
        value={notificationsEnabled}
        onValueChange={handleToggle}
        trackColor={{ false: colors.border, true: colors.primary + '80' }}
        thumbColor={notificationsEnabled ? colors.primary : colors.surface}
      />
    </TouchableOpacity>
  );
});
