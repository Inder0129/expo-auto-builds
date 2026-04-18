import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

interface LogoutButtonProps {
  onPress: () => void;
  style?: any;
}

export const LogoutButton: React.FC<LogoutButtonProps> = (props: LogoutButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <MaterialCommunityIcons name="logout" size={24} color={colors.error} />
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: spacing.sm,
  },
  text: {
    ...typography.bodyBold,
    color: colors.error,
    marginLeft: spacing.sm,
  },
});
