import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

export interface CustomizationOptionProps {
  option: {
    id: string;
    name: string;
    price: number;
    selected: boolean;
  };
  onToggle: (optionId: string) => void;
  style?: ViewStyle;
}

export const CustomizationOption: React.FC<CustomizationOptionProps> = (props: CustomizationOptionProps) => {
  const { option, onToggle, style } = props;
  
  const handlePress = () => {
    onToggle(option.id);
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.checkboxContainer}>
        <View style={[styles.checkbox, option.selected && styles.checkboxSelected]}>
          {option.selected && (
            <Ionicons name="checkmark" size={16} color={colors.white} />
          )}
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{option.name}</Text>
        <Text style={styles.price}>
          {option.price > 0 ? `+$${option.price.toFixed(2)}` : 'Free'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  checkboxContainer: {
    marginRight: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    ...typography.body,
    color: colors.text.primary,
  },
  price: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
