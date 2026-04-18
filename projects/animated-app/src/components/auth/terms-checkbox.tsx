import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface TermsCheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ value, onValueChange, style }) => {
  const handleToggle = useCallback(() => {
    onValueChange(!value);
  }, [value, onValueChange]);

  return (
    <TouchableOpacity 
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
      }, style]}
      onPress={handleToggle}
      activeOpacity={0.7}
    >
      <View style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: value ? colors.primary : colors.border,
        backgroundColor: value ? colors.primary : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
      }}>
        {value && (
          <Ionicons name="checkmark" size={16} color={colors.white} />
        )}
      </View>
      <Text style={{
        fontSize: typography.fontSize.sm,
        color: colors.textPrimary,
        flex: 1,
        flexWrap: 'wrap',
      }}>
        I agree to the Terms of Service and Privacy Policy
      </Text>
    </TouchableOpacity>
  );
};
