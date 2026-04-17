import React, { useCallback } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Link } from 'expo-router';
import { ProfileHeader } from '@/src/components/profile/profile-header';
import { StatsGrid } from '@/src/components/profile/stats-grid';
import { SettingsList } from '@/src/components/profile/settings-list';
import { WrapperView } from '@/src/components/ui';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { selectUser } from '@/src/store/slices/auth';
import { selectStudyStats } from '@/src/store/slices/study';
import { logout } from '@/src/store/slices/auth';
import styles from '@/src/styles/profile';

export default function ProfileScreen() {
  const user = useAppSelector(selectUser);
  const studyStats = useAppSelector(selectStudyStats);
  const dispatch = useAppDispatch();
  
  const settings = [
    { id: 'notifications', title: 'Notifications', icon: 'bell', route: '/settings/notifications' },
    { id: 'appearance', title: 'Appearance', icon: 'palette', route: '/settings/appearance' },
    { id: 'privacy', title: 'Privacy & Security', icon: 'shield', route: '/settings/privacy' },
    { id: 'help', title: 'Help & Support', icon: 'help-circle', route: '/settings/help' },
    { id: 'about', title: 'About', icon: 'info', route: '/settings/about' }
  ];
  
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  
  const handleSettingPress = useCallback((route: string) => {
    console.log('Navigate to setting:', route);
  }, []);
  
  return (
    <WrapperView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ProfileHeader user={user} onLogout={handleLogout} />
        <StatsGrid stats={studyStats} />
        <SettingsList settings={settings} onPress={handleSettingPress} />
      </ScrollView>
    </WrapperView>
  );
}
