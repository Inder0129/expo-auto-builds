import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ProfileSection } from '@/src/components/profile/profile-section';
import { AddressCard } from '@/src/components/profile/address-card';
import { SettingsItem } from '@/src/components/profile/settings-item';
import { styles } from '@/src/styles/profile';

interface Address {
  id: string;
  title: string;
  address: string;
  isDefault: boolean;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      title: 'Home',
      address: '123 Main St, New York, NY 10001',
      isDefault: true,
    },
    {
      id: '2',
      title: 'Work',
      address: '456 Office Ave, New York, NY 10002',
      isDefault: false,
    },
  ]);

  const handleEditProfile = useCallback(() => {
    Alert.alert('Edit Profile', 'Profile edit functionality would go here');
  }, []);

  const handleAddAddress = useCallback(() => {
    Alert.alert('Add Address', 'Add new address functionality would go here');
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => router.replace('/(auth)/login'),
      },
    ]);
  }, [router]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileSection
          title="Personal Information"
          onEdit={handleEditProfile}
          style={styles.section}
        >
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.email}>john.doe@example.com</Text>
              <Text style={styles.phone}>+1 (555) 123-4567</Text>
            </View>
          </View>
        </ProfileSection>

        <ProfileSection
          title="Saved Addresses"
          onEdit={handleAddAddress}
          style={styles.section}
        >
          {addresses.map((address: Address) => (
            <AddressCard
              key={address.id}
              title={address.title}
              address={address.address}
              isDefault={address.isDefault}
              onPress={() => {}}
              style={styles.addressCard}
            />
          ))}
        </ProfileSection>

        <ProfileSection title="Settings" style={styles.section}>
          <SettingsItem
            icon="notifications"
            title="Notifications"
            onPress={() => {}}
          />
          <SettingsItem
            icon="card"
            title="Payment Methods"
            onPress={() => {}}
          />
          <SettingsItem
            icon="shield-checkmark"
            title="Privacy & Security"
            onPress={() => {}}
          />
          <SettingsItem icon="help-circle" title="Help & Support" onPress={() => {}} />
          <SettingsItem icon="information-circle" title="About" onPress={() => {}} />
        </ProfileSection>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#ff3b30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}