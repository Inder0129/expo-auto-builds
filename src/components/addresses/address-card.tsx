import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

interface Props {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
  style?: any;
}

export const AddressCard: React.FC<Props> = ({ address, onEdit, onDelete, onSetDefault, style }) => {
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
        <Text style={styles.name}>{address.name}</Text>
        {address.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
      </View>
      <Text style={styles.addressLine}>{address.addressLine1}</Text>
      {address.addressLine2 && (
        <Text style={styles.addressLine}>{address.addressLine2}</Text>
      )}
      <Text style={styles.addressLine}>
        {address.city}, {address.state} {address.zipCode}
      </Text>
      <Text style={styles.phone}>{address.phone}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
          <Ionicons name="pencil-outline" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color={colors.error} />
          <Text style={[styles.actionText, { color: colors.error }]}>Delete</Text>
        </TouchableOpacity>
        {!address.isDefault && (
          <TouchableOpacity style={styles.actionButton} onPress={handleSetDefault}>
            <Ionicons name="star-outline" size={20} color={colors.warning} />
            <Text style={[styles.actionText, { color: colors.warning }]}>Set Default</Text>
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
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
  },
  addressLine: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    color: colors.primary,
  },
});
