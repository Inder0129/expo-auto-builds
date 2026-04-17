import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { styles } from '@/src/styles/auth';

type LoginFormProps = {
  credentials: {
    email: string;
    password: string;
  };
  onChange: (credentials: { email: string; password: string }) => void;
  onSubmit: () => void;
  error: string;
};

export function LoginForm({ credentials, onChange, onSubmit, error }: LoginFormProps) {
  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email or Phone"
          value={credentials.email}
          onChangeText={(text) => onChange({ ...credentials, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Password"
          value={credentials.password}
          onChangeText={(text) => onChange({ ...credentials, password: text })}
          secureTextEntry
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button
        title="Sign In"
        onPress={onSubmit}
        style={styles.loginButton}
      />
    </View>
  );
}
