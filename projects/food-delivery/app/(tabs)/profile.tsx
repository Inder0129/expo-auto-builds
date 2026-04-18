import React, { useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/src/store/hooks';
import { ProfileHeader } from '@/src/components/profile/profile-header';
import { MenuItem } from '@/src/components/profile/menu-item';
import { AddressCard } from '@/src/components/profile/address-card';
import { LogoutButton } from '@/src/components/profile/logout-button';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';
import { styles } from '@/src/styles/profile';

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
  route?: string;
};

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAppSelector((state: any) => state.auth.user);
  
  const addresses: AddressType[] = [
    { id: '1', name: 'Home', address: '123 Main St, City, State 12345', isDefault: true },
    { id: '2', name: 'Work', address: '456 Office Ave, City, State 12345', isDefault: false },
  ];
  
  const menuItems: MenuItemType[] = [
    { id: '1', title: 'My Orders', icon: 'receipt', route: '/(tabs)/orders' },
    { id: '2', title: 'Addresses', icon: 'map-marker', route: '/addresses' },
    { id: '3', title: 'Payment Methods', icon: 'credit-card' },
    { id: '4', title: 'Offers', icon: 'tag', route: '/offers' },
    { id: '5', title: 'Notifications', icon: 'bell', route: '/notifications' },
    { id: '6', title: 'Help & Support', icon: 'help-circle' },
    { id: '7', title: 'About', icon: 'information' },
  ];
  
  const handleMenuItemPress = useCallback((item: MenuItemType) => {
    if (item.route) {
      router.push(item.route);
    }
  }, [router]);
  
  const handleAddressPress = useCallback((address: AddressType) => {
    router.push('/addresses');
  }, [router]);
  
  const handleLogout = useCallback(() => {
    // Handle logout logic
    router.replace('/(auth)/login');
  }, [router]);
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileHeader 
        name={user?.name || 'Guest User'}
        email={user?.email || 'guest@example.com'}
        phone={user?.phone || '+1 234 567 8900'}
      />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Addresses</Text>
        {addresses.map((address: AddressType) => (
          <AddressCard
            key={address.id}
            name={address.name}
            address={address.address}
            isDefault={address.isDefault}
            onPress={() => handleAddressPress(address)}
          />
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        {menuItems.map((item: MenuItemType) => (
          <MenuItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            onPress={() => handleMenuItemPress(item)}
          />
        ))}
      </View>
      
      <View style={styles.logoutSection}>
        <LogoutButton onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}
