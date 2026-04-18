import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import styles from './cart-item.styles';

interface Props {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  restaurantName: string;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export const CartItem: React.FC<Props> = ({
  name,
  description,
  price,
  quantity,
  image,
  restaurantName,
  onRemove,
  onUpdateQuantity
}) => {
  const totalPrice = price * quantity;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <TouchableOpacity onPress={onRemove}>
            <Ionicons name="close" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <Text style={styles.restaurant}>{restaurantName}</Text>
        
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => onUpdateQuantity(quantity - 1)}
            >
              <Ionicons name="remove" size={16} color={colors.textPrimary} />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => onUpdateQuantity(quantity + 1)}
            >
              <Ionicons name="add" size={16} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};
