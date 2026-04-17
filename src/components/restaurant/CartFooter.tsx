import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/src/components/ui/Button';
import styles from './cart-footer.styles';

type CartFooterProps = {
  itemCount: number;
  total: number;
  onCheckout: () => void;
  onViewCart: () => void;
};

export function CartFooter({
  itemCount,
  total,
  onCheckout,
  onViewCart,
}: CartFooterProps) {
  if (itemCount === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cartSummary} onPress={onViewCart}>
        <View style={styles.cartInfo}>
          <Text style={styles.itemCount}>{itemCount} items</Text>
          <Text style={styles.total}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.viewCartButton}>
          <Text style={styles.viewCartText}>View Cart</Text>
          <Ionicons name="chevron-forward" size={16} color="white" />
        </View>
      </TouchableOpacity>
      <Button
        title="Checkout"
        onPress={onCheckout}
        style={styles.checkoutButton}
      />
    </View>
  );
}
