import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import DefaultBadge from '@/src/components/addresses/default-badge';

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface AddressCardProps {
  address: Address;
  onEditPress: () => void;
  onDeletePress: () => void;
  onSetDefaultPress: () => void;
  style?: ViewStyle;
}

const AddressCard: React.FC<AddressCardProps> = (props: AddressCardProps) => {
  const { address, onEditPress, onDeletePress, onSetDefaultPress, style } = props;

  const handleEditPress = useCallback(() => {
    onEditPress();
  }, [onEditPress]);

  const handleDeletePress = useCallback(() => {
    onDeletePress();
  }, [onDeletePress]);

  const handleSetDefaultPress = useCallback(() => {
    onSetDefaultPress();
  }, [onSetDefaultPress]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.name}>{address.name}</Text>
        {address.isDefault && <DefaultBadge />}
      </View>
      <Text style={styles.phone}>{address.phone}</Text>
      <Text style={styles.addressLine}>{address.addressLine1}</Text>
      {address.addressLine2 && (
        <Text style={styles.addressLine}>{address.addressLine2}</Text>
      )}
      <Text style={styles.addressLine}>
        {address.city}, {address.state} {address.zipCode}
      </Text>
      <Text style={styles.addressLine}>{address.country}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={handleEditPress} style={styles.actionButton}>
          <Ionicons name="create-outline" size={20} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.primary }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeletePress} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={20} color={colors.error} />
          <Text style={[styles.actionText, { color: colors.error }]}>Delete</Text>
        </TouchableOpacity>
        {!address.isDefault && (
          <TouchableOpacity onPress={handleSetDefaultPress} style={styles.actionButton}>
            <Ionicons name="star-outline" size={20} color={colors.textSecondary} />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>Set as Default</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  phone: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  addressLine: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    fontWeight: '500',
  },
});

export default AddressCard;
