import React, { useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { logout } from '@/src/store/slices/auth';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { ProfileHeader } from '@/src/components/profile/profile-header';
import { MenuItem } from '@/src/components/profile/menu-item';
import { AddressCard } from '@/src/components/profile/address-card';
import { LogoutButton } from '@/src/components/profile/logout-button';
import styles from '@/src/styles/profile';

type Address = {
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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user.user);
  const addresses = useAppSelector((state: any) => state.user.addresses);

  const menuItems: MenuItemType[] = [
    { id: '1', title: 'My Orders', icon: 'receipt', route: '/(tabs)/orders' },
    { id: '2', title: 'Addresses', icon: 'map-marker', route: '/addresses' },
    { id: '3', title: 'Payment Methods', icon: 'credit-card' },
    { id: '4', title: 'Notifications', icon: 'bell' },
    { id: '5', title: 'Help & Support', icon: 'help-circle' },
    { id: '6', title: 'About', icon: 'information' },
  ];

  const handleMenuItemPress = useCallback((item: MenuItemType) => {
    if (item.route) {
      router.push(item.route);
    }
  }, [router]);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            router.replace('/(auth)/login');
          }
        }
      ]
    );
  }, [dispatch, router]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileHeader 
        name={user?.name || 'Guest User'}
        email={user?.email || 'guest@example.com'}
        phone={user?.phone || '+1 234 567 8900'}
      />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Addresses</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.addressesScroll}>
          {addresses.map((address: Address) => (
            <AddressCard 
              key={address.id}
              name={address.name}
              address={address.address}
              isDefault={address.isDefault}
            />
          ))}
        </ScrollView>
        <Button 
          title="Manage Addresses" 
          variant="outline" 
          onPress={() => router.push('/addresses')}
          style={styles.manageButton}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <Card style={styles.menuCard}>
          {menuItems.map((item: MenuItemType) => (
            <MenuItem 
              key={item.id}
              title={item.title}
              icon={item.icon}
              onPress={() => handleMenuItemPress(item)}
            />
          ))}
        </Card>
      </View>
      
      <LogoutButton onPress={handleLogout} />
    </ScrollView>
  );
}
