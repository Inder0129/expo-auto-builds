import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Input, Card } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createAuthStyles } from '@/styles/authStyles';

type RegisterFormProps = {
  onRegisterSuccess: () => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const styles = useThemedStyles(createAuthStyles);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = useCallback(() => {
    if (email && password && password === confirmPassword) {
      onRegisterSuccess();
    }
  }, [email, password, confirmPassword, onRegisterSuccess]);

  return (
    <Card>
      <Text>Register</Text>
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
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </Card>
  );
};
