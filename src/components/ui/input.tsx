import React, { useState } from 'react';
import { TextInput, Text } from 'react-native';
import { useThemedStyles, moderateScaleFactor, spacing, fontSize } from '@/theme';

interface InputProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChangeText, error }) => {
  const styles = useThemedStyles();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && <Text style={styles.inputErrorText}>{error}</Text>}
    </View>
  );
};

export default Input;