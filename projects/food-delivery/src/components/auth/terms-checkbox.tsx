import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';

interface TermsCheckboxProps {
  accepted: boolean;
  onToggle: () => void;
  style?: ViewStyle;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = (props: TermsCheckboxProps) => {
  const { accepted, onToggle, style } = props;

  const handleToggle = useCallback(() => {
    onToggle?.();
  }, [onToggle]);

  return (
    <TouchableOpacity onPress={handleToggle} style={[styles.container, style]}>
      <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
        {accepted && <Ionicons name="checkmark" size={16} color={colors.white} />}
      </View>
      <Text style={styles.text}>
        I agree to the <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    ...typography.caption,
    color: colors.text.secondary,
    flex: 1,
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
  },
});
