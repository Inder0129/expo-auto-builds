import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { colors, spacing, typography } from '@/src/theme';

type AuthFormProps = {
  type: 'login' | 'register';
  onSubmit: (data: any) => void;
  loading?: boolean;
};

type FormData = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export function AuthForm({ type, onSubmit, loading = false }: AuthFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(formData);
  }, [formData, onSubmit]);

  return (
    <View>
      {type === 'register' && (
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name || ''}
          onChangeText={(value) => handleChange('name', value)}
          autoCapitalize="words"
          editable={!loading}
        />
      )}
      
      <Input
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      
      <Input
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry={!showPassword}
        editable={!loading}
        rightIcon={(
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      />
      
      {type === 'register' && (
        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword || ''}
          onChangeText={(value) => handleChange('confirmPassword', value)}
          secureTextEntry={!showConfirmPassword}
          editable={!loading}
          rightIcon={(
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        />
      )}
      
      <Button
        title={type === 'login' ? 'Login' : 'Register'}
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={{ marginTop: spacing.lg }}
      />
    </View>
  );
}
