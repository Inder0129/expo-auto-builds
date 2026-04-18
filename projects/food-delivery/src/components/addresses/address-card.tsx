import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Address } from '@/src/store/slices/user';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';

interface AddressCardProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
  style?: any;
}

export const AddressCard: React.FC<AddressCardProps> = ({ 
  address, 
  onEdit, 
  onDelete, 
  onSetDefault, 
  style 
}) => {
  const handleEdit = useCallback(() => {
    onEdit();
  }, [onEdit]);

  const handleDelete = useCallback(() => {
    onDelete();
  }, [onDelete]);

  const handleSetDefault = useCallback(() => {
    onSetDefault();
  }, [onSetDefault]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{address.name}</Text>
          {address.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
            <Ionicons name="pencil-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.phone}>{address.phone}</Text>
      
      <Text style={styles.addressLine}>{address.addressLine1}</Text>
      {address.addressLine2 ? (
        <Text style={styles.addressLine}>{address.addressLine2}</Text>
      ) : null}
      
      <View style={styles.footer}>
        <Text style={styles.cityState}>
          {address.city}, {address.state} - {address.pincode}
        </Text>
        
        {!address.isDefault && (
          <TouchableOpacity onPress={handleSetDefault} style={styles.setDefaultButton}>
            <Text style={styles.setDefaultText}>Set as Default</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

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
    marginBottom: spacing.xs,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
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
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  phone: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  addressLine: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  cityState: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  setDefaultButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  setDefaultText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});
