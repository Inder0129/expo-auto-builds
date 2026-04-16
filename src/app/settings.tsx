import React from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import SettingsList from '@/components/settings/settings-list';

const SettingsScreen = () => {
  const styles = useThemedStyles(createSettingsStyles);
  return (
    <View style={styles.container}>
      <SettingsList />
    </View>
  );
};

export default SettingsScreen;