import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@/src/theme';

interface ApplyButtonProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
  variant?: 'primary' | 'outline';
}

export const ApplyButton: React.FC<ApplyButtonProps> = (props: ApplyButtonProps) => {
  const { onPress, title = 'Apply', disabled = false, variant = 'primary' } = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variant === 'outline' && styles.outlineContainer,
        disabled && styles.disabledContainer,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        styles.text,
        variant === 'outline' && styles.outlineText,
        disabled && styles.disabledText,
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabledContainer: {
    backgroundColor: colors.muted,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  outlineText: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.white,
  },
});
