import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type SocialLoginProps = {
  onSocialLogin: (provider: string) => void;
};

export function SocialLogin({ onSocialLogin }: SocialLoginProps) {
  const handleGoogleLogin = useCallback(() => {
    onSocialLogin('google');
  }, [onSocialLogin]);

  const handleFacebookLogin = useCallback(() => {
    onSocialLogin('facebook');
  }, [onSocialLogin]);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing.md }}>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#DB4437',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleGoogleLogin}
      >
        <Ionicons name="logo-google" size={24} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#4267B2',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleFacebookLogin}
      >
        <Ionicons name="logo-facebook" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
