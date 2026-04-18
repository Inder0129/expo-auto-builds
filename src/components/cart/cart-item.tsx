import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch } from '@/src/store/hooks';
import { updateQuantity, removeItem } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Card } from '@/src/components/ui/card';

export interface CartItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  restaurantName: string;
  style?: any;
}

export const CartItem: React.FC<CartItemProps> = ({ 
  id, 
  name, 
  description, 
  price, 
  quantity, 
  image, 
  restaurantName, 
  style 
}) => {
  const dispatch = useAppDispatch();

  const handleIncrease = useCallback(() => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  }, [dispatch, id, quantity]);

  const handleDecrease = useCallback(() => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem(id));
    }
  }, [dispatch, id, quantity]);

  const handleRemove = useCallback(() => {
    dispatch(removeItem(id));
  }, [dispatch, id]);

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: image || 'https://via.placeholder.com/100' }}
          style={styles.image}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <Text style={styles.restaurant}>{restaurantName}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
              <MaterialCommunityIcons 
                name={quantity === 1 ? "delete" : "minus"} 
                size={20} 
                color={quantity === 1 ? colors.error : colors.primary.main} 
              />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{quantity}</Text>
            
            <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
              <MaterialCommunityIcons name="plus" size={20} color={colors.primary.main} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
        <MaterialCommunityIcons name="close" size={20} color={colors.text.secondary} />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  restaurant: {
    ...typography.caption,
    color: colors.primary.main,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  quantityButton: {
    padding: spacing.xs,
  },
  quantity: {
    ...typography.body,
    color: colors.text.primary,
    paddingHorizontal: spacing.sm,
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
});
