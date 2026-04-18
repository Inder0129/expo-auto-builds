import React, { useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';

interface ForgotPasswordLinkProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = (props: ForgotPasswordLinkProps) => {
  const { onPress, style } = props;

  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, style]}>
      <Text style={styles.text}>Forgot Password?</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  text: {
    ...typography.caption,
    color: colors.primary,
  },
});
