import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import styles from './menu-item.styles';

interface Props {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export const MenuItem: React.FC<Props> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContainer}>
        <Ionicons name={icon} size={24} color={colors.textSecondary} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.border} />
    </TouchableOpacity>
  );
};
