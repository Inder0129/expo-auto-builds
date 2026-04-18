import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AddressCard from '@/src/components/addresses/address-card';
import AddressForm from '@/src/components/addresses/address-form';
import { colors } from '@/src/theme';
import { addressesStyles } from '@/src/styles/addresses';

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true,
    },
    {
      id: '2',
      name: 'John Doe',
      phone: '+1 (555) 987-6543',
      addressLine1: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'United States',
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
    setAddresses((prev: Address[]) => prev.filter((addr: Address) => addr.id !== id));
  }, []);

  const handleSetDefault = useCallback((id: string) => {
    setAddresses((prev: Address[]) =>
      prev.map((addr: Address) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  }, []);

  const handleSaveAddress = useCallback((addressData: Omit<Address, 'id'>) => {
    if (editingAddress) {
      setAddresses((prev: Address[]) =>
        prev.map((addr: Address) =>
          addr.id === editingAddress.id ? { ...addressData, id: editingAddress.id } : addr
        )
      );
    } else {
      const newAddress: Address = {
        ...addressData,
        id: Date.now().toString(),
      };
      setAddresses((prev: Address[]) => [newAddress, ...prev]);
    }
    setShowForm(false);
    setEditingAddress(null);
  }, [editingAddress]);

  const handleCancelForm = useCallback(() => {
    setShowForm(false);
    setEditingAddress(null);
  }, []);

  const renderAddressItem = useCallback(({ item }: { item: Address }) => (
    <AddressCard
      address={item}
      onEditPress={() => handleEditAddress(item)}
      onDeletePress={() => handleDeleteAddress(item.id)}
      onSetDefaultPress={() => handleSetDefault(item.id)}
    />
  ), [handleEditAddress, handleDeleteAddress, handleSetDefault]);

  return (
    <SafeAreaView style={addressesStyles.container} edges={['top']}>
      <View style={addressesStyles.header}>
        <Text style={addressesStyles.title}>Saved Addresses</Text>
        <TouchableOpacity onPress={handleAddAddress} style={addressesStyles.addButton}>
          <Ionicons name="add" size={24} color={colors.primary} />
          <Text style={addressesStyles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>

      {showForm ? (
        <AddressForm
          initialData={editingAddress}
          onSave={handleSaveAddress}
          onCancel={handleCancelForm}
        />
      ) : (
        <FlatList
          data={addresses}
          renderItem={renderAddressItem}
          keyExtractor={(item: Address) => item.id}
          contentContainerStyle={addressesStyles.listContainer}
          ListEmptyComponent={(
            <View style={addressesStyles.emptyContainer}>
              <Ionicons name="location-outline" size={64} color={colors.border} />
              <Text style={addressesStyles.emptyText}>No addresses saved</Text>
              <Text style={addressesStyles.emptySubtext}>Add your first delivery address</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
