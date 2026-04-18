import { View, ScrollView, Text } from 'react-native';
import { useCallback } from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { ProfileHeader } from '@/src/components/profile/profile-header';
import { AnimatedStats } from '@/src/components/profile/animated-stats';
import { SettingsList } from '@/src/components/profile/settings-list';
import { styles } from '@/src/styles/profile';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface StatItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface SettingItem {
  id: string;
  title: string;
  icon: string;
  route?: string;
}

export default function ProfileScreen() {
  const scale = useSharedValue(1);
  const stats: StatItem[] = [
    { id: '1', label: 'Animations', value: 42, color: colors.primary },
    { id: '2', label: 'Projects', value: 18, color: colors.secondary },
    { id: '3', label: 'Followers', value: 256, color: colors.accent },
  ];

  const settings: SettingItem[] = [
    { id: '1', title: 'Account Settings', icon: 'settings', route: '/(modals)/settings' },
    { id: '2', title: 'Notification Preferences', icon: 'notifications' },
    { id: '3', title: 'Privacy & Security', icon: 'shield' },
    { id: '4', title: 'Help & Support', icon: 'help-circle' },
    { id: '5', title: 'About App', icon: 'information-circle' },
  ];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleStatPress = useCallback((statId: string) => {
    scale.value = withSpring(scale.value === 1 ? 1.1 : 1);
    console.log('Stat pressed:', statId);
  }, [scale]);

  const handleSettingPress = useCallback((settingId: string) => {
    console.log('Setting pressed:', settingId);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileHeader
        name="John Doe"
        email="john@example.com"
        avatarUrl="https://picsum.photos/200"
      />
      <Animated.View style={[styles.statsContainer, animatedStyle]}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <AnimatedStats
          stats={stats}
          onPress={handleStatPress}
        />
      </Animated.View>
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <SettingsList
          items={settings}
          onPress={handleSettingPress}
        />
      </View>
    </ScrollView>
  );
}