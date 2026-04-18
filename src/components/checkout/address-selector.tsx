import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface Address {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
}

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId: string;
  onSelectAddress: (addressId: string) => void;
  style?: ViewStyle;
}

export const AddressSelector: React.FC<AddressSelectorProps> = (props: AddressSelectorProps) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.addresses.map((address: Address) => (
        <TouchableOpacity
          key={address.id}
          style={[
            styles.addressCard,
            props.selectedAddressId === address.id && styles.addressCardSelected,
          ]}
          onPress={() => props.onSelectAddress(address.id)}
        >
          <View style={styles.addressHeader}>
            <Text style={styles.addressName}>{address.name}</Text>
            {address.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
          <Text style={styles.addressText}>{address.address}</Text>
          <View style={styles.radioContainer}>
            <View style={[
              styles.radioOuter,
              props.selectedAddressId === address.id && styles.radioOuterSelected,
            ]}>
              {props.selectedAddressId === address.id && (
                <View style={styles.radioInner} />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  addressCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addressCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  addressName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  defaultBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  defaultText: {
    ...typography.caption,
    color: colors.success,
  },
  addressText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  radioContainer: {
    alignItems: 'flex-end',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  addButtonText: {
    ...typography.body,
    color: colors.primary,
    marginLeft: spacing.sm,
  },
});
