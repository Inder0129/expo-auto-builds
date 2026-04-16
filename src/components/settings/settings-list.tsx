import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@/theme';

const SettingsList = () => {
  const styles = useThemedStyles(createSettingsListStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Setting 1</Text>
      <Text style={styles.item}>Setting 2</Text>
    </View>
  );
};

export default SettingsList;