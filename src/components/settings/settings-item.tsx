import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createSettingsStyles } from '@/styles/settings';

type SettingsItemProps = {
  title: string;
  type: 'toggle' | 'link';
};

export const SettingsItem: React.FC<SettingsItemProps> = ({ title, type }) => {
  const styles = useThemedStyles(createSettingsStyles);

  return (
    <View style={styles.settingsItem}>
      <Text type="body">{title}</Text>
      {type === 'toggle' && (
        <View style={styles.toggle} />
      )}
      {type === 'link' && (
        <Text type="body">›</Text>
      )}
    </View>
  );
};
