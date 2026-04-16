import React from 'react';
import { View } from 'react-native';
import { RegisterForm } from '@/components/auth';
import { AuthFooter } from '@/components/auth';
import { useThemedStyles } from '@/theme';
import { createAuthStyles } from '@/styles/authStyles';

type RegisterScreenProps = {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
};

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigateToLogin
}) => {
  const styles = useThemedStyles(createAuthStyles);

  return (
    <View style={styles.container}>
      <RegisterForm onRegisterSuccess={onRegisterSuccess} />
      <AuthFooter
        type="register"
        onNavigate={onNavigateToLogin}
      />
    </View>
  );
};
