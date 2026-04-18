import React, { useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';

interface AddAddressButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const AddAddressButton: React.FC<AddAddressButtonProps> = (props: AddAddressButtonProps) => {
  const { onPress, style } = props;

  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.button, style]}>
      <Ionicons name="add" size={24} color={colors.primary} />
      <Text style={styles.text}>Add New</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: 8,
  },
  text: {
    ...typography.button,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});
