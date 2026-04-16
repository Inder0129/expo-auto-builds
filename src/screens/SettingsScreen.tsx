import React from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Container } from '@/components/ui';
import { ThemeSelector, SettingsItem } from '@/components/settings';
import { createSettingsStyles } from '@/styles/settings';

type SettingsScreenProps = {};

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const styles = useThemedStyles(createSettingsStyles);

  return (
    <Container style={styles.container}>
      <View style={styles.section}>
        <SettingsItem title="Theme" description="Choose app theme">
          <ThemeSelector />
        </SettingsItem>
      </View>
      <View style={styles.section}>
        <SettingsItem title="About" description="Calculator v1.0.0" />
      </View>
    </Container>
  );
};
