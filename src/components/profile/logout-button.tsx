import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '@/src/theme';

interface LogoutButtonProps {
  onPress: () => void;
  style?: object;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name="log-out-outline" size={24} color={colors.error} />
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.error,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: spacing.sm,
  },
});
