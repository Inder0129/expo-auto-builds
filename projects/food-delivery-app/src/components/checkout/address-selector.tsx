import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';

type AddressType = {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
};

interface AddressSelectorProps {
  addresses: AddressType[];
  selectedAddress: AddressType | null;
  onSelect: (address: AddressType) => void;
  onAddAddress: () => void;
  style?: ViewStyle;
}

export const AddressSelector: React.FC<AddressSelectorProps> = (props) => {
  const { addresses, selectedAddress, onSelect, onAddAddress, style } = props;
  
  const handleSelect = useCallback((address: AddressType) => {
    onSelect(address);
  }, [onSelect]);
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Button 
          title="Add New" 
          variant="text" 
          size="small" 
          onPress={onAddAddress}
        />
      </View>
      
      {addresses.map((address: AddressType) => (
        <TouchableOpacity 
          key={address.id}
          style={[
            styles.addressCard,
            selectedAddress?.id === address.id && styles.selectedCard,
          ]}
          onPress={() => handleSelect(address)}
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
          <Text style={styles.addressText}>{address.city}, {address.pincode}</Text>
          
          <View style={styles.radioContainer}>
            <View style={[
              styles.radioOuter,
              selectedAddress?.id === address.id && styles.radioOuterSelected,
            ]}>
              {selectedAddress?.id === address.id && (
                <View style={styles.radioInner} />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  addressCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  defaultBadge: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '500',
  },
  addressText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  radioContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
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
});
