import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './profile-menu.styles';

type MenuItem = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

type ProfileMenuProps = {
  onMenuPress: (item: string) => void;
};

export function ProfileMenu({ onMenuPress }: ProfileMenuProps) {
  const menuItems: MenuItem[] = [
    { id: 'orders', title: 'My Orders', icon: 'receipt', route: 'orders' },
    { id: 'addresses', title: 'Saved Addresses', icon: 'location', route: 'addresses' },
    { id: 'preferences', title: 'Preferences', icon: 'settings', route: 'preferences' },
    { id: 'help', title: 'Help & Support', icon: 'help-circle', route: 'help' },
    { id: 'about', title: 'About', icon: 'information-circle', route: 'about' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => onMenuPress(item.id)}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name={item.icon} size={20} color="#666" />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );
}
