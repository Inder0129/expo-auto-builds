import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface CustomizationOptionProps {
  option: {
    id: string;
    name: string;
    options: string[];
    type: 'radio' | 'checkbox';
  };
  selectedValue?: string;
  onSelect: (value: string) => void;
  style?: any;
}

const CustomizationOption: React.FC<CustomizationOptionProps> = ({ 
  option, 
  selectedValue, 
  onSelect, 
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.optionName}>{option.name}</Text>
      <View style={styles.optionsContainer}>
        {option.options.map((opt: string) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.optionButton,
              selectedValue === opt && styles.selectedOption,
            ]}
            onPress={() => onSelect(opt)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.optionText,
              selectedValue === opt && styles.selectedOptionText,
            ]}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  optionName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  selectedOption: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  optionText: {
    ...typography.small,
    color: colors.text.primary,
  },
  selectedOptionText: {
    color: colors.white,
  },
});

export { CustomizationOption };