import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface Variant {
  id: string;
  name: string;
  price: number;
  color?: string;
  size?: string;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelect: (variant: Variant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({ 
  variants, 
  selectedVariant, 
  onSelect 
}) => {
  return (
    <View style={styles.container}>
      {variants.map((variant: Variant) => (
        <TouchableOpacity
          key={variant.id}
          style={[
            styles.variantButton,
            selectedVariant?.id === variant.id && styles.selectedVariant
          ]}
          onPress={() => onSelect(variant)}
        >
          <Text style={[
            styles.variantText,
            selectedVariant?.id === variant.id && styles.selectedVariantText
          ]}>
            {variant.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  variantButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  selectedVariant: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  variantText: {
    ...typography.body,
    color: colors.text.primary,
  },
  selectedVariantText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
