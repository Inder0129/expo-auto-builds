import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';

interface Props {
  name: string;
  email: string;
  onEditPress: () => void;
  style?: any;
}

export const ProfileHeader: React.FC<Props> = ({ name, email, onEditPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: 'https://example.com/avatar.jpg' }}
        style={styles.avatar}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <Button title="Edit" variant="outline" size="small" onPress={onEditPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary.light,
  },
  infoContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
});
