import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

interface CartItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  restaurantName: string;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
  style?: any;
}

export const CartItem: React.FC<CartItemProps> = (props: CartItemProps) => {
  const handleIncrease = () => {
    props.onQuantityChange(props.id, props.quantity + 1);
  };
  
  const handleDecrease = () => {
    if (props.quantity > 1) {
      props.onQuantityChange(props.id, props.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    props.onRemove(props.id);
  };
  
  return (
    <View style={[styles.container, props.style]}>
      <Image source={{ uri: props.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{props.description}</Text>
        <Text style={styles.restaurant}>{props.restaurantName}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
            <MaterialCommunityIcons name="minus" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{props.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
            <MaterialCommunityIcons name="plus" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
            <MaterialCommunityIcons name="delete" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: spacing.xs,
    backgroundColor: colors.primaryLight,
  },
  infoContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  restaurant: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  price: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginHorizontal: spacing.md,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 'auto',
    padding: spacing.xs,
  },
});
