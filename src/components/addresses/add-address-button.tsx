import React, { useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface AddAddressButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export function AddAddressButton(props: AddAddressButtonProps) {
  const { onPress, style } = props;

  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, style]}>
      <Ionicons name="add" size={24} color={colors.white} />
      <Text style={styles.text}>Add New Address</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: 12,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    ...typography.button,
    color: colors.white,
    marginLeft: spacing.sm,
  },
});
