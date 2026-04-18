import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

interface MenuItemProps {
  title: string;
  icon: string;
  onPress: () => void;
  style?: any;
}

export const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={props.icon as any} size={24} color={colors.primary} />
      </View>
      <Text style={styles.title}>{props.title}</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
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
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
});
