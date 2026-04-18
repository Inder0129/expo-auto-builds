import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '@/src/theme';

interface ProfileHeaderProps {
  name: string;
  email: string;
  style?: object;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person" size={60} color={colors.gray} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.round,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
