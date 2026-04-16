import React, { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { useThemedStyles, moderateScaleFactor, spacing, fontSize } from '@/theme';

interface InputProps {
  label: string;
  value?: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChangeText, error }) => {
  const styles = useThemedStyles();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Text style={[styles.label, fontSize.small]}>{label}</Text>
      <TextInput
        style={[styles.input, isFocused ? styles.inputFocused : {}, error ? styles.inputError : {}]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && <Text style={[styles.error, fontSize.small]}>{error}</Text>}
    </View>
  );
};

export default Input;