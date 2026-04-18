import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { logout } from '@/src/store/slices/auth';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import ProfileHeader from '@/src/components/profile/profile-header';
import MenuItem from '@/src/components/profile/menu-item';
import AddressCard from '@/src/components/profile/address-card';
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
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
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
  
  const menuItems: MenuItemType[] = [
    { id: '1', title: 'My Orders', icon: 'receipt-outline', onPress: () => router.push('/(tabs)/orders') },
    { id: '2', title: 'Addresses', icon: 'location-outline', onPress: () => router.push('/addresses') },
    { id: '3', title: 'Payment Methods', icon: 'card-outline', onPress: () => Alert.alert('Coming Soon') },
    { id: '4', title: 'Notifications', icon: 'notifications-outline', onPress: () => Alert.alert('Coming Soon') },
    { id: '5', title: 'Help & Support', icon: 'help-circle-outline', onPress: () => Alert.alert('Coming Soon') },
    { id: '6', title: 'About', icon: 'information-circle-outline', onPress: () => Alert.alert('Coming Soon') },
  ];
  
  const handleEditProfile = useCallback(() => {
    Alert.alert('Edit Profile', 'Coming Soon');
  }, []);
  
  const handleAddAddress = useCallback(() => {
    router.push('/addresses');
  }, [router]);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader
          user={user}
          onEditProfile={handleEditProfile}
        />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          {addresses.map((address: Address) => (
            <AddressCard
              key={address.id}
              address={address}
              onPress={() => Alert.alert('Edit Address', 'Coming Soon')}
            />
          ))}
          <Button
            title="Add New Address"
            variant="outline"
            onPress={handleAddAddress}
            style={styles.addAddressButton}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Card style={styles.menuCard}>
            {menuItems.map((item: MenuItemType) => (
              <MenuItem
                key={item.id}
                title={item.title}
                icon={item.icon}
                onPress={item.onPress}
              />
            ))}
          </Card>
        </View>
        
        <Button
          title="Logout"
          variant="danger"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
