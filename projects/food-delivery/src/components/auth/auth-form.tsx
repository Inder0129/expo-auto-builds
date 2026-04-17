import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';

type LoginMethod = 'phone' | 'email';

interface AuthFormProps {
  method: LoginMethod;
  onSubmit: (data: { phone?: string; email?: string; password?: string }) => void;
  onMethodChange: (method: LoginMethod) => void;
}

export const AuthForm: React.FC<AuthFormProps> = (props: AuthFormProps) => {
  const { method, onSubmit, onMethodChange } = props;
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const handleSubmit = useCallback(() => {
    if (method === 'phone') {
      onSubmit({ phone });
    } else {
      onSubmit({ email, password });
    }
  }, [method, phone, email, password, onSubmit]);
  
  const handleMethodToggle = useCallback(() => {
    onMethodChange(method === 'phone' ? 'email' : 'phone');
  }, [method, onMethodChange]);
  
  return (
    <View>
      <View style={{ flexDirection: 'row', marginBottom: spacing.lg }}>
        <TouchableOpacity
          style={[
            { flex: 1, padding: spacing.md, alignItems: 'center' },
            method === 'phone' && { borderBottomWidth: 2, borderBottomColor: colors.primary }
          ]}
          onPress={() => onMethodChange('phone')}
        >
          <Text style={[
            typography.body,
            method === 'phone' ? { color: colors.primary, fontWeight: '600' } : { color: colors.text.secondary }
          ]}>
            Phone
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { flex: 1, padding: spacing.md, alignItems: 'center' },
            method === 'email' && { borderBottomWidth: 2, borderBottomColor: colors.primary }
          ]}
          onPress={() => onMethodChange('email')}
        >
          <Text style={[
            typography.body,
            method === 'email' ? { color: colors.primary, fontWeight: '600' } : { color: colors.text.secondary }
          ]}>
            Email
          </Text>
        </TouchableOpacity>
      </View>
      
      {method === 'phone' ? (
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: spacing.md,
              ...typography.body,
              marginBottom: spacing.lg,
            }}
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
      ) : (
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: spacing.md,
              ...typography.body,
              marginBottom: spacing.md,
            }}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: spacing.md,
              ...typography.body,
              marginBottom: spacing.lg,
            }}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      )}
      
      <Button title="Continue" onPress={handleSubmit} />
      
      <TouchableOpacity onPress={handleMethodToggle} style={{ marginTop: spacing.md }}>
        <Text style={[typography.body, { color: colors.primary, textAlign: 'center' }]}>
          Use {method === 'phone' ? 'email' : 'phone'} instead
        </Text>
      </TouchableOpacity>
    </View>
  );
};
