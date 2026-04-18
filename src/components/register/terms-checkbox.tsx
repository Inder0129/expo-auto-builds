import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

interface Props {
  accepted: boolean;
  onToggle: () => void;
}

export const TermsCheckbox: React.FC<Props> = ({ accepted, onToggle }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle} activeOpacity={0.7}>
      <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
        {accepted && (
          <Ionicons name="checkmark" size={16} color={colors.white} />
        )}
      </View>
      <Text style={styles.text}>
        I agree to the Terms of Service and Privacy Policy
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    flex: 1,
  },
});
