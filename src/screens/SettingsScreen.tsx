import React from 'react';
import { View } from 'react-native';
import { ThemeSelector } from '@/components/settings/theme-selector';
import { SettingsItem } from '@/components/settings/settings-item';
import { Container } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createSettingsStyles } from '@/styles/settings';

type SettingsScreenProps = {};

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const styles = useThemedStyles(createSettingsStyles);

  return (
    <Container style={styles.container}>
      <View style={styles.section}>
        <ThemeSelector />
      </View>
      <View style={styles.section}>
        <SettingsItem title="Sound Effects" type="toggle" />
        <SettingsItem title="Vibration" type="toggle" />
        <SettingsItem title="About" type="link" />
      </View>
    </Container>
  );
};
