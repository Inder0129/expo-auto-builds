import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '@/src/theme';

interface AddressCardProps {
  title: string;
  address: string;
  isDefault: boolean;
  onPress: () => void;
  style?: object;
}

export const AddressCard: React.FC<AddressCardProps> = ({ title, address, isDefault, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
        <Text style={styles.address}>{address}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.gray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  defaultText: {
    fontSize: 12,
    color: colors.background,
    fontWeight: '600',
  },
  address: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
