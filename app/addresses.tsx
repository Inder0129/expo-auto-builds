import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { AddressCard } from '@/src/components/addresses/address-card';
import { AddAddressButton } from '@/src/components/addresses/add-address-button';
import { Button } from '@/src/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { addAddress } from '@/src/store/slices/user';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';
import { addressesStyles } from '@/src/styles/addresses';

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface AddressFormData {
  id?: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export default function AddressesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state: any) => state.user.addresses);

  const handleAddAddress = useCallback(() => {
    const newAddress: Address = {
      id: Date.now().toString(),
      name: 'New Address',
      phone: '+1234567890',
      addressLine1: '123 Main St',
      addressLine2: '',
      city: 'City',
      state: 'State',
      pincode: '12345',
      isDefault: addresses.length === 0
    };
    dispatch(addAddress(newAddress));
  }, [dispatch, addresses.length]);

  const handleEditAddress = useCallback((address: Address) => {
    Alert.alert('Edit Address', 'Edit functionality would be implemented here');
  }, []);

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
            Alert.alert('Delete functionality would be implemented here');
          }
        }
      ]
    );
  }, []);

  const handleSetDefaultAddress = useCallback((addressId: string) => {
    Alert.alert('Set Default', 'Set default functionality would be implemented here');
  }, []);

  const renderAddressItem = useCallback(({ item }: { item: Address }) => (
    <AddressCard
      address={item}
      onEdit={() => handleEditAddress(item)}
      onDelete={() => handleDeleteAddress(item.id)}
      onSetDefault={() => handleSetDefaultAddress(item.id)}
    />
  ), [handleEditAddress, handleDeleteAddress, handleSetDefaultAddress]);

  return (
    <View style={addressesStyles.container}>
      <Stack.Screen options={{ title: 'My Addresses' }} />
      
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item: Address) => item.id}
        contentContainerStyle={addressesStyles.listContent}
        ListEmptyComponent={(
          <View style={addressesStyles.emptyContainer}>
            <Text style={addressesStyles.emptyText}>No addresses saved yet</Text>
          </View>
        )}
      />
      
      <AddAddressButton onPress={handleAddAddress} />
    </View>
  );
}
