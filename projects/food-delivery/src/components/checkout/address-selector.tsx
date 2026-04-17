import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import { Card } from '@/src/components/ui/card';

export interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
}

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddress: Address | null;
  onSelect: (address: Address) => void;
}

export const AddressSelector: React.FC<AddressSelectorProps> = (props: AddressSelectorProps) => {
  const { addresses, selectedAddress, onSelect } = props;
  
  const handleSelect = useCallback((address: Address) => {
    onSelect(address);
  }, [onSelect]);
  
  return (
    <View>
      {addresses.map((address: Address) => (
        <TouchableOpacity
          key={address.id}
          onPress={() => handleSelect(address)}
          activeOpacity={0.7}
        >
          <Card
            style={{
              marginBottom: spacing.sm,
              borderWidth: 2,
              borderColor: selectedAddress?.id === address.id ? colors.primary : colors.border,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={typography.h4}>{address.name}</Text>
                <Text style={[typography.body, { color: colors.text.secondary, marginTop: spacing.xs }]}>
                  {address.address}
                </Text>
                <Text style={[typography.body, { color: colors.text.secondary }]}>
                  {address.city}, {address.pincode}
                </Text>
                <Text style={[typography.body, { color: colors.text.secondary, marginTop: spacing.xs }]}>
                  {address.phone}
                </Text>
              </View>
              {selectedAddress?.id === address.id && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
};
