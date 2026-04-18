import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  style?: ViewStyle;
}

export const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const { value, onChangeText, onClear, placeholder, autoFocus, style } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleClearPress = useCallback(() => {
    onChangeText('');
    onClear();
  }, [onChangeText, onClear]);

  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused
      ]}>
        <Ionicons 
          name="search" 
          size={20} 
          color={colors.text.secondary} 
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.secondary}
          autoFocus={autoFocus}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.input}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClearPress} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    height: 44,
  },
  inputContainerFocused: {
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  clearButton: {
    padding: spacing.xs,
  },
});