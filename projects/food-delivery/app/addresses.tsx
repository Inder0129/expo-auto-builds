import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AddressCard } from '@/src/components/addresses/address-card';
import { AddAddressButton } from '@/src/components/addresses/add-address-button';
import { EmptyState } from '@/src/components/addresses/empty-state';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { colors, spacing, typography } from '@/src/theme';
import { styles } from '@/src/styles/addresses';

type Address = {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
};

type AddressesScreenProps = {};

export default function AddressesScreen(props: AddressesScreenProps) {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: '2',
      name: 'John Doe',
      addressLine1: '456 Park Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ]);

  const handleAddAddress = useCallback(() => {
    router.push('/address-form');
  }, [router]);

  const handleEditAddress = useCallback((addressId: string) => {
    router.push(`/address-form?id=${addressId}`);
  }, [router]);

  const handleDeleteAddress = useCallback((addressId: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
          },
        },
      ]
    );
  }, []);

  const handleSetDefault = useCallback((addressId: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  }, []);

  const renderAddressItem = useCallback(({ item }: { item: Address }) => (
    <AddressCard
      address={item}
      onEdit={() => handleEditAddress(item.id)}
      onDelete={() => handleDeleteAddress(item.id)}
      onSetDefault={() => handleSetDefault(item.id)}
    />
  ), [handleEditAddress, handleDeleteAddress, handleSetDefault]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'My Addresses',
          headerRight: () => (
            <TouchableOpacity onPress={handleAddAddress} style={styles.headerButton}>
              <Ionicons name="add" size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      {addresses.length === 0 ? (
        <EmptyState onAddAddress={handleAddAddress} />
      ) : (
        <FlatList
          data={addresses}
          renderItem={renderAddressItem}
          keyExtractor={(item: Address) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {addresses.length > 0 && (
        <AddAddressButton onPress={handleAddAddress} style={styles.addButton} />
      )}
    </View>
  );
}
