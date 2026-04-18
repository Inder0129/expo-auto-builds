import React, { useMemo } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface PasswordStrengthProps {
  password: string;
  style?: ViewStyle;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, style }) => {
  const strength = useMemo(() => {
    if (password.length === 0) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [password]);

  const strengthText = useMemo(() => {
    switch (strength) {
      case 0: return 'No password';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return 'Unknown';
    }
  }, [strength]);

  const strengthColor = useMemo(() => {
    switch (strength) {
      case 0: return colors.textSecondary;
      case 1: return colors.error;
      case 2: return colors.warning;
      case 3: return colors.info;
      case 4: return colors.success;
      default: return colors.textSecondary;
    }
  }, [strength]);

  return (
    <View style={[{
      marginBottom: spacing.md,
    }, style]}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xs,
      }}>
        <Text style={{
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
        }}>
          Password strength
        </Text>
        <Text style={{
          fontSize: typography.fontSize.sm,
          color: strengthColor,
          fontWeight: '600',
        }}>
          {strengthText}
        </Text>
      </View>

      <View style={{
        flexDirection: 'row',
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.border,
        overflow: 'hidden',
      }}>
        {[...Array(4)].map((_, index: number) => (
          <View 
            key={index}
            style={{
              flex: 1,
              backgroundColor: index < strength ? strengthColor : colors.border,
              marginRight: index < 3 ? 2 : 0,
            }}
          />
        ))}
      </View>
    </View>
  );
};
