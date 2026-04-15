import React, { useState } from 'react';
import { TextInput, Text } from 'react-native';
import { useThemedStyles, moderateScaleFactor, spacing, fontSize } from '@/theme';

interface InputProps {
  label: string;
  error: string;
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({ label, error, onChangeText }) => {
  const styles = useThemedStyles();
  const scaleFactor = moderateScaleFactor();
  const [value, setValue] = useState('');

  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          onChangeText(text);
        }}
      />
      {error && <Text style={styles.inputErrorText}>{error}</Text>}
    </>
  );
};

export default Input;