import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

export interface AboutSectionProps {
  appName: string;
  version: string;
  onPressAbout?: () => void;
  onPressRate?: () => void;
  onPressShare?: () => void;
  style?: any;
}

export const AboutSection: React.FC<AboutSectionProps> = (props: AboutSectionProps) => {
  const { appName, version, onPressAbout, onPressRate, onPressShare, style } = props;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.appInfo}>
        <View style={styles.appIcon}>
          <Ionicons name="restaurant" size={32} color={colors.primary} />
        </View>
        <View style={styles.appText}>
          <Text style={styles.appName}>{appName}</Text>
          <Text style={styles.version}>Version {version}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onPressAbout} activeOpacity={0.7}>
          <Ionicons name="information-circle-outline" size={20} color={colors.text.secondary} />
          <Text style={styles.actionText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onPressRate} activeOpacity={0.7}>
          <Ionicons name="star-outline" size={20} color={colors.text.secondary} />
          <Text style={styles.actionText}>Rate App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onPressShare} activeOpacity={0.7}>
          <Ionicons name="share-outline" size={20} color={colors.text.secondary} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.copyright}>
        © 2024 {appName}. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 16
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  appIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  appText: {
    alignItems: 'flex-start'
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4
  },
  version: {
    fontSize: 14,
    color: colors.text.secondary
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 32
  },
  actionButton: {
    alignItems: 'center',
    gap: 4
  },
  actionText: {
    fontSize: 12,
    color: colors.text.secondary
  },
  copyright: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center'
  }
});
