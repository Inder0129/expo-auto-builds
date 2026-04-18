import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface AddressCardProps {
  address: {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    isDefault: boolean;
  };
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
  style?: ViewStyle;
}

export const AddressCard: React.FC<AddressCardProps> = (props: AddressCardProps) => {
  const { address, onEdit, onDelete, onSetDefault, style } = props;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{address.name}</Text>
          {address.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <Ionicons name="create-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.addressText}>{address.address}</Text>
      <Text style={styles.addressText}>{address.city}, {address.state} {address.zipCode}</Text>
      <Text style={styles.phoneText}>Phone: {address.phone}</Text>
      {!address.isDefault && (
        <TouchableOpacity style={styles.setDefaultButton} onPress={onSetDefault}>
          <Text style={styles.setDefaultText}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  name: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  defaultText: {
    ...typography.caption,
    color: colors.primary,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  addressText: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  phoneText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  setDefaultButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  setDefaultText: {
    ...typography.caption,
    color: colors.primary,
  },
});
