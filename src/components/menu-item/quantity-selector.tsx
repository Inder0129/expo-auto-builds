import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  style?: any;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  onQuantityChange, 
  style 
}) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };
  
  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };
  
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleDecrease}
        disabled={quantity <= 1}
      >
        <Ionicons 
          name="remove" 
          size={20} 
          color={quantity <= 1 ? colors.text.disabled : colors.primary.main} 
        />
      </TouchableOpacity>
      
      <Text style={styles.quantityText}>{quantity}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleIncrease}
      >
        <Ionicons name="add" size={20} color={colors.primary.main} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xs,
  },
  button: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    ...typography.h3,
    color: colors.text.primary,
    marginHorizontal: spacing.md,
    minWidth: 30,
    textAlign: 'center',
  },
});

export { QuantitySelector };