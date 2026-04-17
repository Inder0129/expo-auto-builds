import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SettingsList } from '@/src/components/settings/settings-list';
import { ThemeToggle } from '@/src/components/settings/theme-toggle';
import { NotificationsToggle } from '@/src/components/settings/notifications-toggle';
import { WrapperView } from '@/src/components/ui/wrapper-view';
import { Button } from '@/src/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { logout } from '@/src/store/slices/auth';
import { colors, spacing, typography } from '@/src/theme';
import { styles } from '@/src/styles/settings';

type SettingsItem = {
  id: string;
  title: string;
  description?: string;
  icon: string;
  onPress: () => void;
};

export default function SettingsScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.replace('/(auth)/login');
  }, [dispatch, router]);

  const settingsItems = useMemo<SettingsItem[]>(
    () => [
      {
        id: 'account',
        title: 'Account Settings',
        description: 'Manage your account information',
        icon: 'person',
        onPress: () => router.push('/account'),
      },
      {
        id: 'privacy',
        title: 'Privacy & Security',
        description: 'Control your privacy settings',
        icon: 'lock',
        onPress: () => router.push('/privacy'),
      },
      {
        id: 'help',
        title: 'Help & Support',
        description: 'Get help and contact support',
        icon: 'help',
        onPress: () => router.push('/help'),
      },
      {
        id: 'about',
        title: 'About Allen Study',
        description: 'App version and information',
        icon: 'information',
        onPress: () => router.push('/about'),
      },
    ],
    [router]
  );

  return (
    <WrapperView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your app preferences</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <ThemeToggle />
          <NotificationsToggle />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <SettingsList items={settingsItems} />
        </View>

        {user && (
          <View style={styles.section}>
            <Button
              title="Log Out"
              variant="outline"
              onPress={handleLogout}
              style={styles.logoutButton}
            />
          </View>
        )}
      </ScrollView>
    </WrapperView>
  );
}
