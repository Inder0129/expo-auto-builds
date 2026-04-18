import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { AddressCard } from '@/src/components/addresses/address-card';
import { AddAddressButton } from '@/src/components/addresses/add-address-button';
import { EditAddressModal } from '@/src/components/addresses/edit-address-modal';
import { Button } from '@/src/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { addAddress, updateAddress, deleteAddress, setDefaultAddress } from '@/src/store/slices/user';
import { Address } from '@/src/store/slices/user';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';
import { addressesStyles } from '@/src/styles/addresses';

type ModalMode = 'add' | 'edit' | null;

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddAddress = useCallback(() => {
    setModalMode('add');
    setEditingAddress(null);
    setModalVisible(true);
  }, []);

  const handleEditAddress = useCallback((address: Address) => {
    setModalMode('edit');
    setEditingAddress(address);
    setModalVisible(true);
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
            dispatch(deleteAddress(addressId));
          }
        }
      ]
    );
  }, [dispatch]);

  const handleSetDefaultAddress = useCallback((addressId: string) => {
    dispatch(setDefaultAddress(addressId));
  }, [dispatch]);

  const handleSaveAddress = useCallback((data: AddressFormData) => {
    if (modalMode === 'add') {
      const newAddress: Address = {
        id: Date.now().toString(),
        ...data
      };
      dispatch(addAddress(newAddress));
    } else if (modalMode === 'edit' && editingAddress) {
      const updatedAddress: Address = {
        ...editingAddress,
        ...data
      };
      dispatch(updateAddress(updatedAddress));
    }
    setModalVisible(false);
    setModalMode(null);
    setEditingAddress(null);
  }, [modalMode, editingAddress, dispatch]);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setModalMode(null);
    setEditingAddress(null);
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
      
      <EditAddressModal
        visible={modalVisible}
        mode={modalMode}
        address={editingAddress}
        onSave={handleSaveAddress}
        onClose={handleCloseModal}
      />
    </View>
  );
}
