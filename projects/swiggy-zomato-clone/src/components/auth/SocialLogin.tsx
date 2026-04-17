import React from 'react';
import { View } from 'react-native';
import { Button } from '@/src/components/ui/Button';
import { styles } from '@/src/styles/auth';

type SocialLoginProps = {
  onSocialLogin: (provider: string) => void;
};

export function SocialLogin({ onSocialLogin }: SocialLoginProps) {
  return (
    <View style={styles.socialLoginContainer}>
      <View style={styles.socialButtons}>
        <Button
          title="Google"
          variant="outline"
          onPress={() => onSocialLogin('google')}
          style={styles.socialButton}
        />
        <Button
          title="Facebook"
          variant="outline"
          onPress={() => onSocialLogin('facebook')}
          style={styles.socialButton}
        />
      </View>
    </View>
  );
}
