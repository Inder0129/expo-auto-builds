import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

export interface AddressSelectorProps {
  addresses: {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    isDefault: boolean;
  }[];
  selectedAddress: string;
  onSelect: (addressId: string) => void;
  style?: ViewStyle;
}

export const AddressSelector: React.FC<AddressSelectorProps> = (props: AddressSelectorProps) => {
  const { addresses, selectedAddress, onSelect, style } = props;
  
  return (
    <View style={[styles.container, style]}>
      {addresses.map((address) => (
        <TouchableOpacity
          key={address.id}
          style={[
            styles.addressCard,
            selectedAddress === address.id && styles.addressCardSelected,
          ]}
          onPress={() => onSelect(address.id)}
          activeOpacity={0.7}
        >
          <View style={styles.radioContainer}>
            <View style={[
              styles.radio,
              selectedAddress === address.id && styles.radioSelected,
            ]}>
              {selectedAddress === address.id && (
                <View style={styles.radioInner} />
              )}
            </View>
          </View>
          <View style={styles.addressContent}>
            <View style={styles.addressHeader}>
              <Text style={styles.addressName}>{address.name}</Text>
              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
            <Text style={styles.addressText}>{address.address}</Text>
            <Text style={styles.addressText}>
              {address.city}, {address.state} {address.zipCode}
            </Text>
            <Text style={styles.phoneText}>{address.phone}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  addressCardSelected: {
    borderColor: colors.primary,
  },
  radioContainer: {
    marginRight: spacing.md,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  addressContent: {
    flex: 1,
    marginRight: spacing.sm,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  addressName: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    ...typography.caption,
    color: colors.primary,
  },
  addressText: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: 2,
  },
  phoneText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});
