import { View, Text, StyleSheet, Switch } from 'react-native';
import { Card } from '../src/components/ui/card';
import { WrapperView } from '../src/components/ui/wrapper-view';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';
import { useState } from 'react';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);

  return (
    <WrapperView>
      <Text style={styles.title}>Settings</Text>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: colors.gray, true: colors.primary }}
          />
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Button Sounds</Text>
          <Switch
            value={isSoundEnabled}
            onValueChange={setIsSoundEnabled}
            trackColor={{ false: colors.gray, true: colors.primary }}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Vibration Feedback</Text>
          <Switch
            value={isVibrationEnabled}
            onValueChange={setIsVibrationEnabled}
            trackColor={{ false: colors.gray, true: colors.primary }}
          />
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>Calculator v1.0.0</Text>
        <Text style={styles.aboutText}>Built with Expo React Native</Text>
      </Card>
    </WrapperView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
  aboutText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
});