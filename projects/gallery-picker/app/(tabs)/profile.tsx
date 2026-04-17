import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';
import { Button } from '../../src/components/ui/Button';
import { Card } from '../../src/components/ui/Card';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    { id: '1', icon: 'settings-outline', label: 'Settings', onPress: () => {} },
    { id: '2', icon: 'card-outline', label: 'Payment Methods', onPress: () => {} },
    { id: '3', icon: 'location-outline', label: 'Addresses', onPress: () => {} },
    { id: '4', icon: 'help-circle-outline', label: 'Help & Support', onPress: () => {} },
    { id: '5', icon: 'information-circle-outline', label: 'About', onPress: () => {} },
  ];

  const addresses = [
    { id: '1', type: 'Home', address: '123 Main St, Apt 4B', city: 'New York, NY 10001' },
    { id: '2', type: 'Work', address: '456 Business Ave, Floor 12', city: 'New York, NY 10002' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
          </View>
          <Button title="Edit Profile" onPress={() => {}} variant="outline" style={styles.editButton} />
        </View>

        <Card style={styles.addressesCard}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          {addresses.map((address) => (
            <View key={address.id} style={styles.addressItem}>
              <View style={styles.addressIconContainer}>
                <Ionicons name="location-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.addressDetails}>
                <Text style={styles.addressType}>{address.type}</Text>
                <Text style={styles.addressText}>{address.address}</Text>
                <Text style={styles.addressCity}>{address.city}</Text>
              </View>
              <Button title="Edit" onPress={() => {}} variant="outline" size="small" />
            </View>
          ))}
          <Button title="Add New Address" onPress={() => {}} variant="primary" style={styles.addAddressButton} />
        </Card>

        <Card style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={24} color={colors.text} style={styles.menuIcon} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          ))}
        </Card>

        <Button title="Sign Out" onPress={() => router.replace('/(auth)/login')} variant="outline" style={styles.signOutButton} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  header: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    ...typography.h2,
    color: colors.background,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.h2,
    color: colors.text,
  },
  profileEmail: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  addressesCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  menuCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  addressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  addressText: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing.xs,
  },
  addressCity: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  addAddressButton: {
    marginTop: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: spacing.md,
  },
  menuLabel: {
    ...typography.body,
    color: colors.text,
  },
  signOutButton: {
    marginBottom: spacing.xl,
  },
});