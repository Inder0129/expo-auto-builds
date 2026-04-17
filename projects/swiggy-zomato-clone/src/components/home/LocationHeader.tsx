import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type LocationHeaderProps = {
  location?: string;
  onPress: () => void;
};

export default function LocationHeader({ location, onPress }: LocationHeaderProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name="location-outline" size={20} color={colors.primary} />
      <View style={styles.textContainer}>
        <Text style={styles.deliveryText}>Delivery to</Text>
        <Text style={styles.locationText} numberOfLines={1}>
          {location || 'Select location'}
        </Text>
      </View>
      <Ionicons name="chevron-down" size={20} color={colors.text.secondary} />
    </TouchableOpacity>
  );
}

const styles = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  textContainer: {
    flex: 1,
    marginLeft: spacing.sm,
    marginRight: spacing.xs,
  },
  deliveryText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  locationText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600' as const,
  },
};
