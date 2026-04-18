import React from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  style?: ViewStyle;
}

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const { value, onChangeText, onClear, placeholder, autoFocus, style } = props;
  
  return (
    <View style={[{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.border,
    }, style]}>
      <Ionicons name="search" size={20} color={colors.text.secondary} />
      <TextInput
        style={{
          flex: 1,
          marginLeft: 8,
          fontSize: 16,
          color: colors.text.primary,
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.secondary}
        autoFocus={autoFocus}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;