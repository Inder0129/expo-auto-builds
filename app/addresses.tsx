import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { AddressCard } from '@/src/components/addresses/address-card';
import { AddressForm } from '@/src/components/addresses/address-form';
import { styles } from '@/src/styles/addresses';

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      phone: '+91 9876543210',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Work',
      address: '456 Business Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400002',
      phone: '+91 9876543211',
      isDefault: false,
    },
  ]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddAddress = useCallback(() => {
    setEditingAddress(null);
    setShowForm(true);
  }, []);

  const handleEditAddress = useCallback((address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  }, []);

  const handleDeleteAddress = useCallback((id: string) => {
    setAddresses(prev => prev.filter(address => address.id !== id));
  }, []);

  const handleSetDefault = useCallback((id: string) => {
    setAddresses(prev => prev.map(address => ({
      ...address,
      isDefault: address.id === id,
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
      setAddresses(prev => [newAddress, ...prev]);
    }
    setShowForm(false);
    setEditingAddress(null);
  }, [editingAddress]);

  const handleCancelForm = useCallback(() => {
    setShowForm(false);
    setEditingAddress(null);
  }, []);

  const renderAddress = useCallback(({ item }: { item: Address }) => (
    <AddressCard
      address={item}
      onEdit={() => handleEditAddress(item)}
      onDelete={() => handleDeleteAddress(item.id)}
      onSetDefault={() => handleSetDefault(item.id)}
    />
  ), [handleEditAddress, handleDeleteAddress, handleSetDefault]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'My Addresses' }} />
      {showForm ? (
        <AddressForm
          initialData={editingAddress}
          onSave={handleSaveAddress}
          onCancel={handleCancelForm}
        />
      ) : (
        <>
          <FlatList
            data={addresses}
            renderItem={renderAddress}
            keyExtractor={(item: Address) => item.id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={(
              <View style={styles.emptyContainer}>
                <Ionicons name="location-outline" size={64} color={colors.gray400} />
                <Text style={styles.emptyText}>No addresses saved yet</Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
            <Ionicons name="add" size={24} color={colors.white} />
            <Text style={styles.addButtonText}>Add New Address</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
