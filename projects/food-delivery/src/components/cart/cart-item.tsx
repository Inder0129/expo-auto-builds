import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '@/src/theme';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantName: string;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
  style?: object;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
  restaurantName,
  onQuantityChange,
  onRemove,
  style,
}) => {
  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Ionicons name="fast-food" size={40} color={colors.gray} />
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.restaurant}>{restaurantName}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
            <Ionicons name="remove" size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
            <Ionicons name="add" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.totalPrice}>${(price * quantity).toFixed(2)}</Text>
        <TouchableOpacity onPress={() => onRemove(id)} style={styles.removeButton}>
          <Ionicons name="trash" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  restaurant: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: spacing.sm,
    minWidth: 20,
    textAlign: 'center',
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  removeButton: {
    padding: spacing.xs,
  },
});
