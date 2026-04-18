import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
};

interface Props {
  item: CartItemType;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
  style?: any;
}

export const CartItem: React.FC<Props> = ({ item, onQuantityChange, onRemove, style }) => {
  const handleIncrease = () => {
    onQuantityChange(item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.quantity - 1);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/80' }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
            <MaterialCommunityIcons name="minus" size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
            <MaterialCommunityIcons name="plus" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.totalPrice}>₹{item.price * item.quantity}</Text>
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <MaterialCommunityIcons name="delete" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    marginBottom: spacing.md,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: spacing.sm,
    marginRight: spacing.md,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  price: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginHorizontal: spacing.md,
    minWidth: 24,
    textAlign: 'center',
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  totalPrice: {
    ...typography.h3,
    color: colors.text.primary,
  },
  removeButton: {
    padding: spacing.xs,
  },
});
