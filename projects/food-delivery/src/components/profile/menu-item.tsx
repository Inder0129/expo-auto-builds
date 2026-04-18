import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  title: string;
  icon: string;
  onPress: () => void;
  style?: any;
}

export const MenuItem: React.FC<Props> = ({ title, icon, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon as any} size={24} color={colors.primary} />
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
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    marginBottom: spacing.sm,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  title: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
});
