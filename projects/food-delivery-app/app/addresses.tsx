import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { AddressList } from '@/src/components/addresses/address-list';
import { AddAddressButton } from '@/src/components/addresses/add-address-button';
import { EditAddressModal } from '@/src/components/addresses/edit-address-modal';
import { styles } from '@/src/styles/addresses';

type Address = {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
};

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      address: '123 Main Street',
      city: 'New York, NY',
      zipCode: '10001',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Work',
      address: '456 Office Ave',
      city: 'Brooklyn, NY',
      zipCode: '11201',
      isDefault: false,
    },
  ]);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleAddAddress = useCallback(() => {
    setEditingAddress(null);
    setModalVisible(true);
  }, []);

  const handleEditAddress = useCallback((address: Address) => {
    setEditingAddress(address);
    setModalVisible(true);
  }, []);

  const handleDeleteAddress = useCallback((id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  }, []);

  const handleSetDefault = useCallback((id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  }, []);

  const handleSaveAddress = useCallback((addressData: Omit<Address, 'id'>) => {
    if (editingAddress) {
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id ? { ...addressData, id: editingAddress.id } : addr
      ));
    } else {
      const newAddress: Address = {
        ...addressData,
        id: Date.now().toString(),
      };
      setAddresses(prev => [...prev, newAddress]);
    }
    setModalVisible(false);
    setEditingAddress(null);
  }, [editingAddress]);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setEditingAddress(null);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Delivery Addresses</Text>
        <AddressList
          addresses={addresses}
          onEdit={handleEditAddress}
          onDelete={handleDeleteAddress}
          onSetDefault={handleSetDefault}
        />
        <AddAddressButton onPress={handleAddAddress} />
      </ScrollView>
      <EditAddressModal
        visible={modalVisible}
        address={editingAddress}
        onSave={handleSaveAddress}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}
