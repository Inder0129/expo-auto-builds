import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/src/theme';

interface SocialLoginProps {
  onLogin: (provider: string) => void;
}

export const SocialLogin: React.FC<SocialLoginProps> = (props: SocialLoginProps) => {
  const { onLogin } = props;
  
  const handleGoogleLogin = useCallback(() => {
    onLogin('google');
  }, [onLogin]);
  
  const handleFacebookLogin = useCallback(() => {
    onLogin('facebook');
  }, [onLogin]);
  
  const handleAppleLogin = useCallback(() => {
    onLogin('apple');
  }, [onLogin]);
  
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <TouchableOpacity
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.surface,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: spacing.sm,
          borderWidth: 1,
          borderColor: colors.border,
        }}
        onPress={handleGoogleLogin}
      >
        <Ionicons name="logo-google" size={24} color={colors.text.primary} />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.surface,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: spacing.sm,
          borderWidth: 1,
          borderColor: colors.border,
        }}
        onPress={handleFacebookLogin}
      >
        <Ionicons name="logo-facebook" size={24} color={colors.text.primary} />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.surface,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: spacing.sm,
          borderWidth: 1,
          borderColor: colors.border,
        }}
        onPress={handleAppleLogin}
      >
        <Ionicons name="logo-apple" size={24} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
};
