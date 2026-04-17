import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setTheme, setDecimalPrecision } from '@/src/store/slices/settings';
import { ThemeSwitcher } from '@/src/components/settings/theme-switcher';
import { DecimalPrecisionSelector } from '@/src/components/settings/decimal-precision-selector';
import { Button, Container, Text } from '@/src/components/ui';
import { createSettingsStyles } from '@/src/styles/settings';
import { useThemeColors } from '@/src/theme';

type SettingsScreenProps = {};

export default function SettingsScreen({}: SettingsScreenProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { theme, decimalPrecision } = useAppSelector((state) => state.settings);
  const colors = useThemeColors();
  const styles = createSettingsStyles(colors);

  const handleThemeChange = useCallback((newTheme: string) => {
    dispatch(setTheme(newTheme));
  }, [dispatch]);

  const handlePrecisionChange = useCallback((precision: number) => {
    dispatch(setDecimalPrecision(precision));
  }, [dispatch]);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <ThemeSwitcher
            currentTheme={theme}
            onThemeChange={handleThemeChange}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calculator</Text>
          <DecimalPrecisionSelector
            currentPrecision={decimalPrecision}
            onPrecisionChange={handlePrecisionChange}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Close" onPress={handleClose} style={styles.closeButton} />
      </View>
    </Container>
  );
}
