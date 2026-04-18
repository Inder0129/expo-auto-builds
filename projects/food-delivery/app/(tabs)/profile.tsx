import React, { useCallback } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { logout } from '@/src/store/slices/auth';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { ProfileHeader } from '@/src/components/profile/profile-header';
import { MenuItem } from '@/src/components/profile/menu-item';
import { AddressCard } from '@/src/components/profile/address-card';
import { LogoutButton } from '@/src/components/profile/logout-button';
import styles from '@/src/styles/profile';

type MenuItemType = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

type AddressType = {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
};

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user.user);
  const addresses = useAppSelector((state: any) => state.user.addresses);

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

  const menuItems: MenuItemType[] = [
    {
      id: '1',
      title: 'My Orders',
      icon: 'receipt-outline',
      onPress: () => router.push('/(tabs)/orders')
    },
    {
      id: '2',
      title: 'Addresses',
      icon: 'location-outline',
      onPress: () => router.push('/addresses')
    },
    {
      id: '3',
      title: 'Payment Methods',
      icon: 'card-outline',
      onPress: () => Alert.alert('Coming Soon')
    },
    {
      id: '4',
      title: 'Settings',
      icon: 'settings-outline',
      onPress: () => Alert.alert('Coming Soon')
    },
    {
      id: '5',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => Alert.alert('Coming Soon')
    }
  ];

  const defaultAddress = addresses.find((addr: AddressType) => addr.isDefault);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileHeader 
        name={user?.name || 'Guest User'}
        email={user?.email || 'guest@example.com'}
        phone={user?.phone || '+1 234 567 8900'}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Default Address</Text>
        {defaultAddress ? (
          <AddressCard 
            name={defaultAddress.name}
            address={defaultAddress.address}
            isDefault={defaultAddress.isDefault}
            onPress={() => router.push('/addresses')}
          />
        ) : (
          <TouchableOpacity 
            style={styles.addAddressButton}
            onPress={() => router.push('/addresses')}
          >
            <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            <Text style={styles.addAddressText}>Add Address</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {menuItems.map((item: MenuItemType) => (
          <MenuItem 
            key={item.id}
            title={item.title}
            icon={item.icon}
            onPress={item.onPress}
          />
        ))}
      </View>

      <View style={styles.logoutSection}>
        <LogoutButton onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}
