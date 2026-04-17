import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { Card } from '@/src/components/ui/card';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
  deliveryFee: number;
  tax: number;
}

interface OrderSummaryProps {
  cart: Cart;
}

export const OrderSummary: React.FC<OrderSummaryProps> = (props: OrderSummaryProps) => {
  const { cart } = props;
  
  const deliveryFee = useMemo(() => cart.deliveryFee || 30, [cart.deliveryFee]);
  const tax = useMemo(() => cart.tax || 18, [cart.tax]);
  const subtotal = useMemo(() => cart.total || 0, [cart.total]);
  const total = useMemo(() => subtotal + deliveryFee + tax, [subtotal, deliveryFee, tax]);
  
  return (
    <Card>
      {cart.items.map((item: CartItem) => (
        <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
          <Text style={typography.body}>{item.name} x {item.quantity}</Text>
          <Text style={typography.body}>₹{item.price * item.quantity}</Text>
        </View>
      ))}
      
      <View style={{ height: 1, backgroundColor: colors.border, marginVertical: spacing.md }} />
      
      <View style={{ marginBottom: spacing.xs }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
          <Text style={[typography.body, { color: colors.text.secondary }]}>Subtotal</Text>
          <Text style={typography.body}>₹{subtotal}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
          <Text style={[typography.body, { color: colors.text.secondary }]}>Delivery Fee</Text>
          <Text style={typography.body}>₹{deliveryFee}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
          <Text style={[typography.body, { color: colors.text.secondary }]}>Tax</Text>
          <Text style={typography.body}>₹{tax}</Text>
        </View>
      </View>
      
      <View style={{ height: 1, backgroundColor: colors.border, marginVertical: spacing.md }} />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={typography.h4}>Total</Text>
        <Text style={typography.h4}>₹{total}</Text>
      </View>
    </Card>
  );
};
