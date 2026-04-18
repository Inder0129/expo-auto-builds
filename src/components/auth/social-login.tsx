import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface SocialLoginProps {
  onSocialLogin: (provider: string) => void;
  style?: ViewStyle;
}

export function SocialLogin(props: SocialLoginProps) {
  const { onSocialLogin, style } = props;

  const handleGoogleLogin = useCallback(() => {
    onSocialLogin?.('google');
  }, [onSocialLogin]);

  const handleFacebookLogin = useCallback(() => {
    onSocialLogin?.('facebook');
  }, [onSocialLogin]);

  const handleAppleLogin = useCallback(() => {
    onSocialLogin?.('apple');
  }, [onSocialLogin]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={handleGoogleLogin} style={styles.socialButton}>
        <Ionicons name="logo-google" size={24} color={colors.error} />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleFacebookLogin} style={[styles.socialButton, styles.facebookButton]}>
        <Ionicons name="logo-facebook" size={24} color={colors.white} />
        <Text style={[styles.socialButtonText, styles.facebookText]}>Continue with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAppleLogin} style={[styles.socialButton, styles.appleButton]}>
        <Ionicons name="logo-apple" size={24} color={colors.white} />
        <Text style={[styles.socialButtonText, styles.appleText]}>Continue with Apple</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  socialButtonText: {
    ...typography.button,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  facebookText: {
    color: colors.white,
  },
  appleButton: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  appleText: {
    color: colors.white,
  },
});
