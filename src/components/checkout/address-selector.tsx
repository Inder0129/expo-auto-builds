import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId: string;
  onSelectAddress: (addressId: string) => void;
}

export const AddressSelector: React.FC<AddressSelectorProps> = (props: AddressSelectorProps) => {
  return (
    <View style={styles.container}>
      {props.addresses.map((address: Address) => (
        <TouchableOpacity
          key={address.id}
          style={[
            styles.addressCard,
            props.selectedAddressId === address.id && styles.addressCardSelected
          ]}
          onPress={() => props.onSelectAddress(address.id)}
        >
          <View style={styles.addressHeader}>
            <Text style={styles.addressName}>{address.name}</Text>
            {address.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Default</Text>
              </View>
            )}
          </View>
          <Text style={styles.addressText}>{address.address}</Text>
          <Text style={styles.addressText}>{address.city}, {address.postalCode}</Text>
          
          {props.selectedAddressId === address.id && (
            <View style={styles.selectedIndicator}>
              <Text style={styles.selectedIndicatorText}>✓ Selected</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm
  },
  addressCard: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border
  },
  addressCardSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm
  },
  addressName: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    fontWeight: '600'
  },
  defaultBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs
  },
  defaultBadgeText: {
    ...typography.bodySmall,
    color: colors.success
  },
  addressText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs
  },
  selectedIndicator: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  selectedIndicatorText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600'
  },
  addButton: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center'
  },
  addButtonText: {
    ...typography.body,
    color: colors.primary
  }
});