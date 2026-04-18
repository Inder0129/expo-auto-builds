import React from 'react';
import { TextInput, ViewStyle } from 'react-native';
import { colors } from '@/src/theme';

interface PromoCodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = (props: PromoCodeInputProps) => {
  const { value, onChangeText, placeholder, style } = props;
  
  return (
    <TextInput
      style={[{
        flex: 1,
        height: 48,
        backgroundColor: colors.surface,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: colors.text.primary,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: 12,
      }, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.text.secondary}
    />
  );
};

export default PromoCodeInput;