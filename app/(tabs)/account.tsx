import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProfileHeader } from '@/src/components/account/profile-header';
import { MenuItem } from '@/src/components/account/menu-item';
import { Avatar } from '@/src/components/account/avatar';
import { Button } from '@/src/components/ui/button';
import { colors } from '@/src/theme';
import { styles } from '@/src/styles/account';

interface MenuOption {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: 'link' | 'toggle' | 'action';
  value?: boolean;
  route?: string;
}

export default function AccountScreen() {
  const router = useRouter();
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>([
    { id: '1', title: 'My Addresses', icon: 'location-outline', type: 'link', route: '/addresses' },
    { id: '2', title: 'Payment Methods', icon: 'card-outline', type: 'link', route: '/payments' },
    { id: '3', title: 'Notifications', icon: 'notifications-outline', type: 'toggle', value: true },
    { id: '4', title: 'Dark Mode', icon: 'moon-outline', type: 'toggle', value: false },
    { id: '5', title: 'Help Center', icon: 'help-circle-outline', type: 'link', route: '/help' },
    { id: '6', title: 'About ShopEasy', icon: 'information-circle-outline', type: 'link', route: '/about' },
    { id: '7', title: 'Privacy Policy', icon: 'shield-checkmark-outline', type: 'link', route: '/privacy' },
    { id: '8', title: 'Terms of Service', icon: 'document-text-outline', type: 'link', route: '/terms' },
  ]);

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2023',
  };

  const handleToggle = useCallback((id: string) => {
    setMenuOptions((prev: MenuOption[]) => 
      prev.map((option: MenuOption) => 
        option.id === id ? { ...option, value: !option.value } : option
      )
    );
  }, []);

  const handleMenuPress = useCallback((option: MenuOption) => {
    if (option.type === 'link' && option.route) {
      router.push(option.route);
    } else if (option.type === 'toggle') {
      handleToggle(option.id);
    }
  }, [router, handleToggle]);

  const handleEditProfile = useCallback(() => {
    router.push('/edit-profile');
  }, [router]);

  const handleLogout = useCallback(() => {
    router.replace('/(auth)/login');
  }, [router]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader>
          <Avatar size={80} initials="JD" />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userInfo}>Member since {user.joinDate}</Text>
          <Button
            title="Edit Profile"
            onPress={handleEditProfile}
            variant="outline"
            style={styles.editButton}
          />
        </ProfileHeader>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          {menuOptions.map((option: MenuOption) => (
            <MenuItem
              key={option.id}
              title={option.title}
              icon={option.icon}
              type={option.type}
              value={option.value}
              onPress={() => handleMenuPress(option)}
            />
          ))}
        </View>

        <View style={styles.actionsSection}>
          <Button
            title="Sign Out"
            onPress={handleLogout}
            variant="danger"
            style={styles.logoutButton}
          />
          <TouchableOpacity style={styles.deleteAccountButton}>
            <Text style={styles.deleteAccountText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
