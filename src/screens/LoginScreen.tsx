import React from 'react';
import { View } from 'react-native';
import { LoginForm } from '@/components/auth';
import { AuthFooter } from '@/components/auth';
import { useThemedStyles } from '@/theme';
import { createAuthStyles } from '@/styles/authStyles';

type LoginScreenProps = {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  onForgotPassword: () => void;
};

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onForgotPassword
}) => {
  const styles = useThemedStyles(createAuthStyles);

  return (
    <View style={styles.container}>
      <LoginForm
        onLoginSuccess={onLoginSuccess}
        onForgotPassword={onForgotPassword}
      />
      <AuthFooter
        type="login"
        onNavigate={onNavigateToRegister}
      />
    </View>
  );
};
