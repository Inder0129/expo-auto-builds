import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import Animated, { FadeIn, SlideInLeft } from 'react-native-reanimated';
import { Button } from '@/src/components/ui';
import { colors, spacing, typography } from '@/src/theme';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { toggleDarkMode } from '@/src/store/slices/ui';
import { updateSettings } from '@/src/store/slices/settings';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SettingsModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.ui.darkMode);
  const settings = useAppSelector((state) => state.settings);
  
  const [notifications, setNotifications] = useState<boolean>(settings.notifications);
  const [analytics, setAnalytics] = useState<boolean>(settings.analytics);

  const handleSave = (): void => {
    dispatch(updateSettings({ notifications, analytics }));
    router.back();
  };

  const handleClose = (): void => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.delay(200)} style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={SlideInLeft.delay(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={() => dispatch(toggleDarkMode())}
              trackColor={{ false: colors.grayLight, true: colors.primary }}
            />
          </View>
        </Animated.View>

        <Animated.View entering={SlideInLeft.delay(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.grayLight, true: colors.primary }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Analytics</Text>
            <Switch
              value={analytics}
              onValueChange={setAnalytics}
              trackColor={{ false: colors.grayLight, true: colors.primary }}
            />
          </View>
        </Animated.View>

        <Animated.View entering={SlideInLeft.delay(800)} style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            AnimatedApp v1.0.0
          </Text>
          <Text style={styles.aboutText}>
            Built with React Native Reanimated
          </Text>
        </Animated.View>
      </ScrollView>

      <Animated.View entering={FadeIn.delay(1000)} style={styles.footer}>
        <Button
          title="Save Changes"
          onPress={handleSave}
          style={styles.button}
          size="medium"
        />
        <Button
          title="Cancel"
          onPress={handleClose}
          style={[styles.button, styles.cancelButton]}
          size="medium"
          variant="outline"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xl
  },
  header: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs
  },
  subtitle: {
    ...typography.body,
    color: colors.gray
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg
  },
  section: {
    marginBottom: spacing.xl
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  label: {
    ...typography.body,
    color: colors.text
  },
  aboutText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  button: {
    marginBottom: spacing.md
  },
  cancelButton: {
    marginBottom: 0
  }
});