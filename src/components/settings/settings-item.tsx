import React from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Text } from '@/components/ui';
import { createSettingsItemStyles } from './settings-item.styles';

type SettingsItemProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export const SettingsItem: React.FC<SettingsItemProps> = ({ title, description, children }) => {
  const styles = useThemedStyles(createSettingsItemStyles);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {children && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  );
};
