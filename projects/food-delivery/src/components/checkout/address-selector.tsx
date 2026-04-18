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
  selectedAddress: string;
  onSelectAddress: (addressId: string) => void;
  style?: any;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
  addresses,
  selectedAddress,
  onSelectAddress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {addresses.map((address: Address) => (
        <TouchableOpacity
          key={address.id}
          style={[
            styles.addressItem,
            selectedAddress === address.id && styles.selectedAddress,
          ]}
          onPress={() => onSelectAddress(address.id)}
          activeOpacity={0.7}
        >
          <View style={styles.radioContainer}>
            <View style={[
              styles.radioOuter,
              selectedAddress === address.id && styles.radioOuterSelected,
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
          </View>
          
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={colors.text.secondary} 
          />
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
        <Ionicons name="add" size={24} color={colors.primary.main} />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedAddress: {
    backgroundColor: colors.primary.light + '20',
  },
  radioContainer: {
    marginRight: spacing.sm,
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
    borderColor: colors.primary.main,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary.main,
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
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: colors.success.light,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    ...typography.small,
    color: colors.success.main,
  },
  addressText: {
    ...typography.small,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  addButtonText: {
    ...typography.body,
    color: colors.primary.main,
    marginLeft: spacing.sm,
  },
});

export { AddressSelector };