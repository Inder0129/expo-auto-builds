import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Input, Card } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createAuthStyles } from '@/styles/authStyles';

type LoginFormProps = {
  onLoginSuccess: () => void;
  onForgotPassword: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onForgotPassword
}) => {
  const styles = useThemedStyles(createAuthStyles);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(() => {
    if (email && password) {
      onLoginSuccess();
    }
  }, [email, password, onLoginSuccess]);

  return (
    <Card>
      <Text>Login</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Forgot Password?"
        onPress={onForgotPassword}
        variant="text"
      />
    </Card>
  );
};
