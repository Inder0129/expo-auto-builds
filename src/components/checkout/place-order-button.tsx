import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';

interface PlaceOrderButtonProps {
  total: number;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = (props) => {
  const { total, onPress, disabled = false, style } = props;
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>
      
      <Button 
        title="Place Order" 
        onPress={onPress}
        disabled={disabled}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  button: {
    flex: 1,
    marginLeft: 16,
  },
});
