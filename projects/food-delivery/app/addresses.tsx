import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AddressCard from '@/src/components/address/address-card';
import AddAddressButton from '@/src/components/address/add-address-button';
import { colors } from '@/src/theme';
import addressesStyles from '@/src/styles/addresses';

interface Address {
  id: string;
  title: string;
  address: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

const AddressesScreen: React.FC = () => {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      title: 'Home',
      address: '123 Main Street, Apt 4B, New York, NY 10001',
      isDefault: true,
      type: 'home'
    },
    {
      id: '2',
      title: 'Work',
      address: '456 Business Ave, Floor 12, New York, NY 10002',
      isDefault: false,
      type: 'work'
    },
    {
      id: '3',
      title: 'Other',
      address: '789 Park Road, New York, NY 10003',
      isDefault: false,
      type: 'other'
    }
  ]);

  const handleAddAddress = useCallback(() => {
    router.push('/address-form');
  }, [router]);

  const handleEditAddress = useCallback((address: Address) => {
    router.push({ pathname: '/address-form', params: { address: JSON.stringify(address) } });
  }, [router]);

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
            setAddresses((prev: Address[]) => prev.filter((addr: Address) => addr.id !== id));
          }
        }
      ]
    );
  }, []);

  const handleSetDefault = useCallback((id: string) => {
    setAddresses((prev: Address[]) =>
      prev.map((addr: Address) => ({
        ...addr,
        isDefault: addr.id === id
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
    <SafeAreaView style={addressesStyles.container} edges={['top']}>
      <View style={addressesStyles.header}>
        <Text style={addressesStyles.title}>Delivery Addresses</Text>
        <Text style={addressesStyles.subtitle}>Manage your delivery addresses</Text>
      </View>

      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item: Address) => item.id}
        contentContainerStyle={addressesStyles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={addressesStyles.footer}>
        <AddAddressButton onPress={handleAddAddress} />
      </View>
    </SafeAreaView>
  );
};

export default AddressesScreen;