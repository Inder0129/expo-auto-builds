import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './address-list.styles';

type Address = {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
};

type AddressListProps = {
  onAddressPress: (addressId: string) => void;
};

export function AddressList({ onAddressPress }: AddressListProps) {
  const addresses: Address[] = [
    {
      id: '1',
      name: 'Home',
      address: '123 Main St, City, State 12345',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Work',
      address: '456 Office Ave, City, State 12345',
      isDefault: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Addresses</Text>
        <TouchableOpacity onPress={() => onAddressPress('new')}>
          <Text style={styles.addButton}>Add New</Text>
        </TouchableOpacity>
      </View>
      {addresses.map((address) => (
        <TouchableOpacity
          key={address.id}
          style={styles.addressItem}
          onPress={() => onAddressPress(address.id)}
        >
          <View style={styles.addressIcon}>
            <Ionicons
              name={address.name === 'Home' ? 'home' : 'business'}
              size={20}
              color="#666"
            />
          </View>
          <View style={styles.addressDetails}>
            <View style={styles.addressHeader}>
              <Text style={styles.addressName}>{address.name}</Text>
              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
              )}
            </View>
            <Text style={styles.addressText}>{address.address}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );
}
