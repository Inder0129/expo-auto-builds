import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = (props: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (props.quantity > 1) {
      props.onQuantityChange(props.quantity - 1);
    }
  };
  
  const handleIncrease = () => {
    props.onQuantityChange(props.quantity + 1);
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleDecrease}
        disabled={props.quantity <= 1}
      >
        <Text style={[
          styles.buttonText,
          props.quantity <= 1 && styles.buttonTextDisabled
        ]}>
          -
        </Text>
      </TouchableOpacity>
      
      <View style={styles.quantityDisplay}>
        <Text style={styles.quantityText}>{props.quantity}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleIncrease}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderRadius: spacing.sm,
    padding: spacing.xs,
    alignSelf: 'flex-start'
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    ...typography.h2,
    color: colors.primary
  },
  buttonTextDisabled: {
    color: colors.textDisabled
  },
  quantityDisplay: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityText: {
    ...typography.h2,
    color: colors.textPrimary
  }
});