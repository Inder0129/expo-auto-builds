import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

export interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  style?: ViewStyle;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = (props: QuantitySelectorProps) => {
  const { quantity, onQuantityChange, style } = props;
  
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
        style={[styles.button, quantity === 1 && styles.buttonDisabled]} 
        onPress={handleDecrease}
        disabled={quantity === 1}
        activeOpacity={0.7}
      >
        <Ionicons name="remove" size={20} color={quantity === 1 ? colors.text.disabled : colors.primary} />
      </TouchableOpacity>
      
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleIncrease}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  quantityContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    ...typography.h3,
    color: colors.text.primary,
  },
});
