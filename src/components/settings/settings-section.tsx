import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@/components/icons';
import { useThemedStyles } from '@/theme';
import { createSettingsSectionStyles } from './settings-section-styles';

type SettingsSectionProps = {
  title: string;
  icon: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
};

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  icon,
  onPress,
  rightComponent
}) => {
  const styles = useThemedStyles(createSettingsSectionStyles);
  
  const content = (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Icon name={icon} size={24} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightComponent || <Icon name="chevron-right" size={20} style={styles.chevron} />}
    </View>
  );
  
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }
  
  return content;
};
