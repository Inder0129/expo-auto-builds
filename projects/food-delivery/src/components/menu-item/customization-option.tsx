import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface Option {
  id: string;
  name: string;
  price: number;
}

interface CustomizationOptionProps {
  customization: {
    id: string;
    name: string;
    options: Option[];
  };
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
}

export const CustomizationOption: React.FC<CustomizationOptionProps> = (props: CustomizationOptionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.customization.name}</Text>
      <View style={styles.optionsContainer}>
        {props.customization.options.map((option: Option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              props.selectedOptionId === option.id && styles.optionButtonSelected
            ]}
            onPress={() => props.onSelect(option.id)}
          >
            <Text style={[
              styles.optionText,
              props.selectedOptionId === option.id && styles.optionTextSelected
            ]}>
              {option.name}
            </Text>
            <Text style={[
              styles.optionPrice,
              props.selectedOptionId === option.id && styles.optionPriceSelected
            ]}>
              {option.price > 0 ? `+$${option.price.toFixed(2)}` : 'Free'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md
  },
  title: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    marginBottom: spacing.sm
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm
  },
  optionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 100
  },
  optionButtonSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary
  },
  optionText: {
    ...typography.body,
    color: colors.textPrimary,
    textAlign: 'center'
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600'
  },
  optionPrice: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs
  },
  optionPriceSelected: {
    color: colors.primary
  }
});