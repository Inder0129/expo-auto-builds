import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type Address = {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
};

interface AddressCardProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
  style?: ViewStyle;
}

export function AddressCard(props: AddressCardProps) {
  const { address, onEdit, onDelete, onSetDefault, style } = props;

  const handleEdit = useCallback(() => {
    onEdit?.();
  }, [onEdit]);

  const handleDelete = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  const handleSetDefault = useCallback(() => {
    onSetDefault?.();
  }, [onSetDefault]);

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
          <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
            <Ionicons name="pencil" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Ionicons name="trash" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.addressContent}>
        <Text style={styles.addressLine}>{address.addressLine1}</Text>
        {address.addressLine2 && (
          <Text style={styles.addressLine}>{address.addressLine2}</Text>
        )}
        <Text style={styles.addressLine}>
          {address.city}, {address.state} {address.zipCode}
        </Text>
        <Text style={styles.phone}>{address.phone}</Text>
      </View>

      {!address.isDefault && (
        <TouchableOpacity onPress={handleSetDefault} style={styles.setDefaultButton}>
          <Text style={styles.setDefaultText}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
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
    flex: 1,
    flexWrap: 'wrap',
  },
  name: {
    ...typography.h3,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  defaultText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
  addressContent: {
    marginBottom: spacing.sm,
  },
  addressLine: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  phone: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  setDefaultButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
  },
  setDefaultText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
});
