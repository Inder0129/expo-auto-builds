import React, { useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/src/store/hooks';
import { ProfileHeader } from '@/src/components/profile/profile-header';
import { MenuItem } from '@/src/components/profile/menu-item';
import { AddressCard } from '@/src/components/profile/address-card';
import { LogoutButton } from '@/src/components/profile/logout-button';
import { colors, spacing, typography } from '@/src/theme';
import styles from '@/src/styles/profile';

type AddressType = {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
};

type MenuItemType = {
  id: string;
  title: string;
  icon: string;
  route: string;
};

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAppSelector((state: any) => state.user.user);

  const addresses: AddressType[] = [
    { id: '1', name: 'Home', address: '123 Main St, City', isDefault: true },
    { id: '2', name: 'Work', address: '456 Office Ave, City', isDefault: false },
  ];

  const menuItems: MenuItemType[] = [
    { id: '1', title: 'My Orders', icon: 'list', route: '/(tabs)/orders' },
    { id: '2', title: 'Addresses', icon: 'map-marker', route: '/(modals)/addresses' },
    { id: '3', title: 'Offers', icon: 'tag', route: '/(modals)/offers' },
    { id: '4', title: 'Notifications', icon: 'bell', route: '/(modals)/notifications' },
    { id: '5', title: 'Settings', icon: 'cog', route: '/(modals)/settings' },
  ];

  const handleMenuItemPress = useCallback((route: string) => {
    router.push(route);
  }, [router]);

  const handleAddressPress = useCallback((addressId: string) => {
    router.push(`/(modals)/addresses?id=${addressId}`);
  }, [router]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ProfileHeader user={user} />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Addresses</Text>
        {addresses.map((address: AddressType) => (
          <AddressCard
            key={address.id}
            address={address}
            onPress={() => handleAddressPress(address.id)}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {menuItems.map((item: MenuItemType) => (
          <MenuItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            onPress={() => handleMenuItemPress(item.route)}
          />
        ))}
      </View>

      <LogoutButton style={styles.logoutButton} />
    </ScrollView>
  );
}
