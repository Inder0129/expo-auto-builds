import React from 'react';
import { Switch, StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

export interface ToggleSwitchProps {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  style?: any;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = (props: ToggleSwitchProps) => {
  const { value, onValueChange, style } = props;

  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.border, true: colors.primary + '80' }}
      thumbColor={value ? colors.primary : colors.text.secondary}
      ios_backgroundColor={colors.border}
      style={style}
    />
  );
};
