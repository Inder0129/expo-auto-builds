import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  style?: ViewStyle;
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
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleDecrease}
        disabled={props.quantity <= 1}
      >
        <Ionicons name="remove" size={24} color={props.quantity <= 1 ? colors.textDisabled : colors.primary} />
      </TouchableOpacity>
      
      <Text style={styles.quantity}>{props.quantity}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleIncrease}
      >
        <Ionicons name="add" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 150,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  quantity: {
    ...typography.heading,
    color: colors.textPrimary,
    minWidth: 40,
    textAlign: 'center',
  },
});
