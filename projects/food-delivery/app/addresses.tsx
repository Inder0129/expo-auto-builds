import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Alert, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { AddressCard } from '@/src/components/addresses/address-card';
import { AddAddressButton } from '@/src/components/addresses/add-address-button';
import { EditAddressModal } from '@/src/components/addresses/edit-address-modal';
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

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      addressLine1: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Jane Smith',
      addressLine1: '456 Oak Avenue',
      addressLine2: 'Apt 3B',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleAddAddress = useCallback(() => {
    setSelectedAddress(null);
    setModalVisible(true);
  }, []);

  const handleEditAddress = useCallback((address: Address) => {
    setSelectedAddress(address);
    setModalVisible(true);
  }, []);

  const handleDeleteAddress = useCallback((id: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAddresses((prev) => prev.filter((addr) => addr.id !== id));
          },
        },
      ]
    );
  }, []);

  const handleSaveAddress = useCallback((address: Omit<Address, 'id'>) => {
    if (selectedAddress) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === selectedAddress.id ? { ...address, id: selectedAddress.id } : addr))
      );
    } else {
      const newAddress: Address = {
        ...address,
        id: Date.now().toString(),
      };
      setAddresses((prev) => [...prev, newAddress]);
    }
    setModalVisible(false);
    setSelectedAddress(null);
  }, [selectedAddress]);

  const handleSetDefault = useCallback((id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  }, []);

  const renderAddressItem = useCallback(({ item }: { item: Address }) => (
    <AddressCard
      address={item}
      onEdit={() => handleEditAddress(item)}
      onDelete={() => handleDeleteAddress(item.id)}
      onSetDefault={() => handleSetDefault(item.id)}
    />
  ), [handleEditAddress, handleDeleteAddress, handleSetDefault]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Saved Addresses',
          headerRight: () => (
            <TouchableOpacity onPress={handleAddAddress} style={StyleSheet.absoluteFillObject}>
              <Ionicons name="add" size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item: Address) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={(
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={64} color={colors.gray} />
            <Text style={styles.emptyText}>No saved addresses</Text>
          </View>
        )}
      />
      <AddAddressButton onPress={handleAddAddress} />
      <EditAddressModal
        visible={modalVisible}
        address={selectedAddress}
        onSave={handleSaveAddress}
        onClose={() => {
          setModalVisible(false);
          setSelectedAddress(null);
        }}
      />
    </View>
  );
}
