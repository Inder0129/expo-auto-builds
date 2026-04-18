import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/src/theme';

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddress: string;
  onSelectAddress: (addressId: string) => void;
  style?: ViewStyle;
}

export const AddressSelector: React.FC<AddressSelectorProps> = (props: AddressSelectorProps) => {
  const { addresses, selectedAddress, onSelectAddress, style } = props;

  return (
    <View style={style}>
      {addresses.map((address: Address) => (
        <TouchableOpacity
          key={address.id}
          style={[
            {
              padding: 16,
              borderWidth: 2,
              borderColor: colors.border,
              borderRadius: 8,
              marginBottom: 12,
              backgroundColor: colors.surface,
            },
            selectedAddress === address.id && {
              borderColor: colors.primary,
              backgroundColor: colors.primary + '10',
            },
          ]}
          onPress={() => onSelectAddress(address.id)}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text.primary }}>
              {address.name}
            </Text>
            {address.isDefault && (
              <View style={{ 
                backgroundColor: colors.primary,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 4,
              }}>
                <Text style={{ color: colors.white, fontSize: 12, fontWeight: '600' }}>Default</Text>
              </View>
            )}
          </View>
          <Text style={{ fontSize: 14, color: colors.text.secondary, marginTop: 4 }}>
            {address.address}
          </Text>
          <Text style={{ fontSize: 14, color: colors.text.secondary, marginTop: 2 }}>
            {address.city} - {address.pincode}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <View style={[
              {
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: colors.border,
                marginRight: 8,
                justifyContent: 'center',
                alignItems: 'center',
              },
              selectedAddress === address.id && {
                borderColor: colors.primary,
              },
            ]}>
              {selectedAddress === address.id && (
                <View style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: colors.primary,
                }} />
              )}
            </View>
            <Text style={{ fontSize: 14, color: colors.text.secondary }}>
              Deliver to this address
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
