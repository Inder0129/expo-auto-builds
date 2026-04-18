import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export interface ProfileHeaderProps {
  name: string;
  email: string;
  phone: string;
  style?: any;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, phone, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.phone}>{phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  phone: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
