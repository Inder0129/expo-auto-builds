import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface CustomizationOptionProps {
  name: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  style?: ViewStyle;
}

export const CustomizationOption: React.FC<CustomizationOptionProps> = (props: CustomizationOptionProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.name}>{props.name}</Text>
      <View style={styles.optionsContainer}>
        {props.options.map((option: string) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              props.selectedOption === option && styles.optionButtonSelected,
            ]}
            onPress={() => props.onSelect(option)}
          >
            <Text style={[
              styles.optionText,
              props.selectedOption === option && styles.optionTextSelected,
            ]}>
              {option}
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
  name: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  optionButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  optionText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  optionTextSelected: {
    color: colors.primary,
  },
});
