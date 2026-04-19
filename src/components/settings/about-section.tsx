import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Button } from '@/src/components/ui';
import { colors } from '@/src/theme';
import Constants from 'expo-constants';

interface AboutSectionProps {
  style?: any;
}

export function AboutSection(props: AboutSectionProps) {
  const { style } = props;

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://example.com/privacy');
  };

  const handleTermsOfService = () => {
    Linking.openURL('https://example.com/terms');
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>About CameraApp</Text>
      <Text style={styles.text}>
        CameraApp is a powerful camera application that lets you capture, edit, and organize your photos with ease.
      </Text>
      <Text style={styles.text}>
        Features include high-quality photo capture, built-in editing tools, and a beautiful gallery to manage your memories.
      </Text>
      
      <View style={styles.buttons}>
        <Button
          title="Privacy Policy"
          onPress={handlePrivacyPolicy}
          variant="outline"
          style={styles.button}
        />
        <Button
          title="Terms of Service"
          onPress={handleTermsOfService}
          variant="outline"
          style={styles.button}
        />
      </View>
      
      <Text style={styles.version}>
        Version {Constants.expoConfig?.version || '1.0.0'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
  },
  version: {
    color: colors.textTertiary,
    fontSize: 12,
    marginTop: 16,
    textAlign: 'center',
  },
});
