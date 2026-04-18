import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from '@/src/components/ui/card';
import { colors } from '@/src/theme';

type OrderItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

interface OrderItemsProps {
  items: OrderItemType[];
}

export const OrderItems: React.FC<OrderItemsProps> = ({ items }) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.sectionTitle}>Order Items</Text>
      
      {items.map((item: OrderItemType) => (
        <View key={item.id} style={styles.itemContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Image</Text>
          </View>
          
          <View style={styles.itemDetails}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.itemPrice}>
              ${item.price.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
            <Text style={styles.itemTotal}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginTop: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: colors.surface,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imagePlaceholderText: {
    fontSize: 10,
    color: colors.text.secondary,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  quantityContainer: {
    alignItems: 'flex-end',
  },
  quantityText: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
