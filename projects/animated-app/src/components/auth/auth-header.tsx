import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <Animated.View 
      entering={FadeInDown.duration(800)}
      style={{
        marginBottom: spacing.xl * 2,
        alignItems: 'center',
      }}
    >
      <Text style={{
        fontSize: typography.fontSize.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.sm,
      }}>
        {title}
      </Text>
      <Text style={{
        fontSize: typography.fontSize.md,
        color: colors.textSecondary,
        textAlign: 'center',
      }}>
        {subtitle}
      </Text>
    </Animated.View>
  );
};
