import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

type UserType = {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
};

interface Props {
  user: UserType;
  style?: any;
}

export const ProfileHeader: React.FC<Props> = ({ user, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: user.avatar || 'https://via.placeholder.com/100' }}
        style={styles.avatar}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        {user.phone && <Text style={styles.phone}>{user.phone}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.lg,
  },
  infoContainer: {
    flex: 1,
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
