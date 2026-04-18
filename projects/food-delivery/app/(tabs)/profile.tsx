import React from 'react';
import { View, ScrollView, Text, SafeAreaView } from 'react-native';
import { ProfileHeader } from '@/src/components/profile/profile-header';
import { MenuList } from '@/src/components/profile/menu-list';
import { AddressCard } from '@/src/components/profile/address-card';
import { LogoutButton } from '@/src/components/profile/logout-button';
import { styles } from '@/src/styles/profile';

type Address = {
  id: string;
  title: string;
  address: string;
  isDefault: boolean;
};

type MenuItem = {
  id: string;
  title: string;
  icon: string;
};

export default function ProfileScreen() {
  const addresses: Address[] = [
    { id: '1', title: 'Home', address: '123 Main St, City, State 12345', isDefault: true },
    { id: '2', title: 'Work', address: '456 Office Ave, City, State 12345', isDefault: false },
  ];

  const menuItems: MenuItem[] = [
    { id: '1', title: 'My Orders', icon: 'receipt' },
    { id: '2', title: 'Payment Methods', icon: 'card' },
    { id: '3', title: 'Notifications', icon: 'notifications' },
    { id: '4', title: 'Help & Support', icon: 'help-circle' },
    { id: '5', title: 'About', icon: 'information-circle' },
  ];

  const handleMenuPress = (item: MenuItem) => {
    console.log('Menu pressed:', item.title);
  };

  const handleAddressPress = (address: Address) => {
    console.log('Address pressed:', address.title);
  };

  const handleLogout = () => {
    console.log('Logout pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader name="John Doe" email="john.doe@example.com" />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Addresses</Text>
          {addresses.map((address: Address) => (
            <AddressCard
              key={address.id}
              title={address.title}
              address={address.address}
              isDefault={address.isDefault}
              onPress={() => handleAddressPress(address)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <MenuList items={menuItems} onItemPress={handleMenuPress} />
        </View>

        <View style={styles.logoutSection}>
          <LogoutButton onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
