import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

export interface MenuItemProps {
  title: string;
  icon: string;
  onPress: () => void;
  style?: any;
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, icon, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon as any} size={24} color={colors.primary.main} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    ...typography.body,
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
});
