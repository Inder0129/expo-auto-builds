import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { AddressList } from '@/src/components/address/AddressList';
import { AddAddressButton } from '@/src/components/address/AddAddressButton';
import { LoadingIndicator } from '@/src/components/ui/LoadingIndicator';
import { colors, spacing, typography } from '@/src/theme';
import { styles } from '@/src/styles/address';

type Address = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  latitude: number;
  longitude: number;
};

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true,
      latitude: 40.7128,
      longitude: -74.0060
    },
    {
      id: '2',
      name: 'Work',
      address: '456 Office Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      isDefault: false,
      latitude: 40.7589,
      longitude: -73.9851
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('1');

  const defaultAddress = useMemo(() => 
    addresses.find(addr => addr.isDefault) || addresses[0],
    [addresses]
  );

  const handleAddAddress = useCallback(() => {
    router.push('/addresses/new');
  }, [router]);

  const handleEditAddress = useCallback((id: string) => {
    router.push(`/addresses/edit/${id}`);
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
            setAddresses(prev => prev.filter(addr => addr.id !== id));
          }
        }
      ]
    );
  }, []);

  const handleSetDefault = useCallback((id: string) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
  }, []);

  const handleSelectAddress = useCallback((id: string) => {
    setSelectedAddress(id);
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Delivery Addresses</Text>
          <Text style={styles.subtitle}>Manage your delivery locations</Text>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: defaultAddress.latitude,
              longitude: defaultAddress.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {addresses.map(address => (
              <Marker
                key={address.id}
                coordinate={{
                  latitude: address.latitude,
                  longitude: address.longitude
                }}
                title={address.name}
                description={address.address}
              />
            ))}
          </MapView>
        </View>

        <AddressList
          addresses={addresses}
          selectedAddress={selectedAddress}
          onEdit={handleEditAddress}
          onDelete={handleDeleteAddress}
          onSetDefault={handleSetDefault}
          onSelect={handleSelectAddress}
        />
      </ScrollView>

      <AddAddressButton onPress={handleAddAddress} />
    </View>
  );
}
