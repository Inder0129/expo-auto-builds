import React, { useCallback, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { logout } from '@/src/store/slices/auth';
import { ProfileHeader } from '@/src/components/profile/ProfileHeader';
import { ProfileMenu } from '@/src/components/profile/ProfileMenu';
import { AddressList } from '@/src/components/profile/AddressList';
import { LoadingIndicator } from '@/src/components/ui/LoadingIndicator';
import { Button } from '@/src/components/ui/Button';
import styles from '@/src/styles/profile';

type ProfileScreenProps = {};

export default function ProfileScreen({}: ProfileScreenProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEditProfile = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSaveProfile = useCallback(() => {
    setIsEditing(false);
    // Save profile logic here
  }, []);

  const handleAddressPress = useCallback((addressId: string) => {
    router.push('/addresses');
  }, [router]);

  const handleMenuPress = useCallback((item: string) => {
    switch (item) {
      case 'orders':
        router.push('/(tabs)/orders');
        break;
      case 'addresses':
        router.push('/addresses');
        break;
      case 'preferences':
        // Navigate to preferences screen
        break;
      case 'help':
        // Navigate to help screen
        break;
      case 'about':
        // Navigate to about screen
        break;
    }
  }, [router]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!user) {
    router.replace('/(auth)/login');
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader
          user={user}
          isEditing={isEditing}
          onEdit={handleEditProfile}
          onSave={handleSaveProfile}
        />
        <View style={styles.section}>
          <AddressList onAddressPress={handleAddressPress} />
        </View>
        <View style={styles.section}>
          <ProfileMenu onMenuPress={handleMenuPress} />
        </View>
      </ScrollView>
      <View style={styles.logoutContainer}>
        <Button
          title="Logout"
          variant="outline"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </View>
    </View>
  );
}
