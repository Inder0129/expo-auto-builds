import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/src/components/ui/card';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';
import { Address } from '@/src/types/address';

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
  style?: ViewStyle;
}

export const AddressCard: React.FC<AddressCardProps> = (props: AddressCardProps) => {
  const { address, isSelected, onEdit, onDelete, onSelect, style } = props;

  const handleEdit = useCallback(() => {
    onEdit?.();
  }, [onEdit]);

  const handleDelete = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  const handleSelect = useCallback(() => {
    onSelect?.();
  }, [onSelect]);

  return (
    <Card style={[styles.card, isSelected && styles.selectedCard, style]}>
      <TouchableOpacity onPress={handleSelect} style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{address.name}</Text>
          {address.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>

        <Text style={styles.address}>{address.street}</Text>
        <Text style={styles.address}>{address.city}, {address.state} {address.zipCode}</Text>
        <Text style={styles.phone}>Phone: {address.phone}</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
            <Ionicons name="pencil-outline" size={20} color={colors.primary} />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color={colors.error} />
            <Text style={[styles.actionText, { color: colors.error }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    position: 'relative',
  },
  selectedCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.h3,
    color: colors.text.primary,
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
  address: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  phone: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  actionText: {
    ...typography.caption,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  selectedIndicator: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
});
