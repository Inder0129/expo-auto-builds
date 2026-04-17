import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { logout } from '@/src/store/slices/auth';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { ProfileHeader } from '@/src/components/profile/profile-header';
import { MenuList } from '@/src/components/profile/menu-list';
import { AddressCard } from '@/src/components/profile/address-card';
import { styles } from '@/src/styles/profile';

type MenuItem = {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
};

type Address = {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
};

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.auth.user);
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', name: 'Home', address: '123 Main St, City, State 12345', isDefault: true },
    { id: '2', name: 'Work', address: '456 Office Ave, City, State 12345', isDefault: false },
  ]);

  const handleLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          router.replace('/(auth)/login');
        },
      },
    ]);
  }, [dispatch, router]);

  const menuItems: MenuItem[] = [
    { id: '1', title: 'My Orders', icon: 'list', onPress: () => router.push('/(tabs)/orders') },
    { id: '2', title: 'Payment Methods', icon: 'credit-card', onPress: () => Alert.alert('Payment Methods', 'Coming soon') },
    { id: '3', title: 'Notifications', icon: 'bell', onPress: () => Alert.alert('Notifications', 'Coming soon') },
    { id: '4', title: 'Help & Support', icon: 'help-circle', onPress: () => Alert.alert('Help', 'Coming soon') },
    { id: '5', title: 'About', icon: 'info', onPress: () => Alert.alert('About', 'FoodDelivery v1.0') },
  ];

  const handleAddAddress = useCallback(() => {
    Alert.alert('Add Address', 'Coming soon');
  }, []);

  const handleEditAddress = useCallback((addressId: string) => {
    Alert.alert('Edit Address', `Edit address ${addressId}`);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ProfileHeader
        name={user?.name || 'Guest User'}
        email={user?.email || 'guest@example.com'}
        onEdit={() => Alert.alert('Edit Profile', 'Coming soon')}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Addresses</Text>
        {addresses.map((address: Address) => (
          <AddressCard
            key={address.id}
            name={address.name}
            address={address.address}
            isDefault={address.isDefault}
            onEdit={() => handleEditAddress(address.id)}
          />
        ))}
        <Button title="Add New Address" variant="outline" onPress={handleAddAddress} style={styles.addButton} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <MenuList items={menuItems} />
      </View>

      <Button title="Logout" variant="destructive" onPress={handleLogout} style={styles.logoutButton} />
    </ScrollView>
  );
}
