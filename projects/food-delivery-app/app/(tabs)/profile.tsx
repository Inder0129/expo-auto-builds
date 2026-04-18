import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { logout } from '@/src/store/slices/auth';
import { colors, spacing, typography } from '@/src/theme';
import { ProfileHeader } from '@/src/components/profile/profile-header';
import { MenuList } from '@/src/components/profile/menu-list';
import { AddressCard } from '@/src/components/profile/address-card';
import { LogoutButton } from '@/src/components/profile/logout-button';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import styles from '@/src/styles/profile';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

interface Address {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
}

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

  const handleEditProfile = useCallback(() => {
    // Navigate to edit profile screen
    console.log('Edit profile');
  }, []);

  const handleAddAddress = useCallback(() => {
    router.push('/addresses');
  }, [router]);

  const menuItems: MenuItem[] = [
    { id: '1', title: 'My Orders', icon: 'receipt', onPress: () => router.push('/(tabs)/orders') },
    { id: '2', title: 'Payment Methods', icon: 'credit-card', onPress: () => console.log('Payment') },
    { id: '3', title: 'Notifications', icon: 'bell', onPress: () => console.log('Notifications') },
    { id: '4', title: 'Help & Support', icon: 'help-circle', onPress: () => console.log('Help') },
    { id: '5', title: 'About', icon: 'info', onPress: () => console.log('About') },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ProfileHeader
        name={user?.name || 'Guest User'}
        email={user?.email || 'guest@example.com'}
        onEditPress={handleEditProfile}
      />

      <Card style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Addresses</Text>
          <Button title="Add New" variant="outline" size="small" onPress={handleAddAddress} />
        </View>
        {addresses.map((address: Address) => (
          <AddressCard
            key={address.id}
            name={address.name}
            address={address.address}
            isDefault={address.isDefault}
            onPress={() => console.log('Edit address', address.id)}
          />
        ))}
      </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <MenuList items={menuItems} />
      </Card>

      <LogoutButton onPress={handleLogout} />
    </ScrollView>
  );
}
