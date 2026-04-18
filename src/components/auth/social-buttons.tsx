import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, ViewStyle } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface SocialButtonsProps {
  onSocialLogin: (provider: string) => void;
  style?: ViewStyle;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({ onSocialLogin, style }) => {
  const handleGoogleLogin = useCallback(() => {
    onSocialLogin('google');
  }, [onSocialLogin]);

  const handleFacebookLogin = useCallback(() => {
    onSocialLogin('facebook');
  }, [onSocialLogin]);

  const handleAppleLogin = useCallback(() => {
    onSocialLogin('apple');
  }, [onSocialLogin]);

  return (
    <Animated.View 
      entering={FadeInUp.delay(400).duration(800)}
      style={[{
        marginTop: spacing.xl,
      }, style]}
    >
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing.md,
      }}>
        <Text style={{
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
        }}>
          Or continue with
        </Text>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.md,
      }}>
        <TouchableOpacity 
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border,
          }}
          onPress={handleGoogleLogin}
        >
          <Ionicons name="logo-google" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border,
          }}
          onPress={handleFacebookLogin}
        >
          <Ionicons name="logo-facebook" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border,
          }}
          onPress={handleAppleLogin}
        >
          <Ionicons name="logo-apple" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
