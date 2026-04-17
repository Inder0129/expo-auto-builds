import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/src/components/ui/Button';
import { styles } from '@/src/styles/address';

type Address = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
};

type AddressListProps = {
  addresses: Address[];
  selectedAddress: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  onSelect: (id: string) => void;
};

export function AddressList({
  addresses,
  selectedAddress,
  onEdit,
  onDelete,
  onSetDefault,
  onSelect,
}: AddressListProps) {
  return (
    <View style={styles.addressList}>
      {addresses.map((address) => (
        <View
          key={address.id}
          style={[
            styles.addressItem,
            selectedAddress === address.id && styles.selectedAddress,
          ]}
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
          <Text style={styles.addressText}>
            {address.city}, {address.state} {address.zipCode}
          </Text>

          <View style={styles.addressActions}>
            <Button
              title="Edit"
              variant="outline"
              size="small"
              onPress={() => onEdit(address.id)}
              style={styles.actionButton}
            />
            <Button
              title="Delete"
              variant="outline"
              size="small"
              onPress={() => onDelete(address.id)}
              style={styles.actionButton}
            />
            {!address.isDefault && (
              <Button
                title="Set Default"
                variant="primary"
                size="small"
                onPress={() => onSetDefault(address.id)}
                style={styles.actionButton}
              />
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
