import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { AddressCard } from '@/src/components/addresses/address-card';
import { AddAddressButton } from '@/src/components/addresses/add-address-button';
import { EmptyAddresses } from '@/src/components/addresses/empty-addresses';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addAddress, removeAddress, updateAddress, selectAddresses } from '@/src/store/slices/user';
import { Address } from '@/src/types/address';
import { styles } from '@/src/styles/addresses';

export default function AddressesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(selectAddresses);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleAddAddress = useCallback(() => {
    router.push('/address-form');
  }, [router]);

  const handleEditAddress = useCallback((address: Address) => {
    router.push({ pathname: '/address-form', params: { id: address.id } });
  }, [router]);

  const handleDeleteAddress = useCallback((id: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => dispatch(removeAddress(id)) }
      ]
    );
  }, [dispatch]);

  const handleSelectAddress = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const renderItem = useCallback(({ item }: { item: Address }) => (
    <AddressCard
      address={item}
      isSelected={selectedId === item.id}
      onEdit={() => handleEditAddress(item)}
      onDelete={() => handleDeleteAddress(item.id)}
      onSelect={() => handleSelectAddress(item.id)}
    />
  ), [selectedId, handleEditAddress, handleDeleteAddress, handleSelectAddress]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Delivery Addresses</Text>
        <AddAddressButton onPress={handleAddAddress} />
      </View>

      {addresses.length === 0 ? (
        <EmptyAddresses onAddAddress={handleAddAddress} />
      ) : (
        <FlatList
          data={addresses}
          renderItem={renderItem}
          keyExtractor={(item: Address) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {addresses.length > 0 && (
        <View style={styles.footer}>
          <Button
            title="Use Selected Address"
            onPress={() => {
              if (selectedId) {
                router.back();
              }
            }}
            disabled={!selectedId}
            variant="primary"
            style={styles.confirmButton}
          />
        </View>
      )}
    </View>
  );
}
