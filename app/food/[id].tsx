import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FoodImage } from '@/src/components/food/food-image';
import { CustomizationOptions } from '@/src/components/food/customization-options';
import { QuantitySelector } from '@/src/components/food/quantity-selector';
import { AddToCartButton } from '@/src/components/food/add-to-cart-button';
import { styles } from '@/src/styles/food-detail';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

type CustomizationOption = {
  id: string;
  name: string;
  price: number;
};

type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  preparationTime: number;
  imageUrl: string;
  customizations: CustomizationOption[];
};

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  
  const foodItem: FoodItem = {
    id: id || '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh lettuce, tomato, onion, and special sauce',
    price: 12.99,
    rating: 4.5,
    preparationTime: 20,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    customizations: [
      { id: '1', name: 'Extra Cheese', price: 1.5 },
      { id: '2', name: 'Bacon', price: 2.0 },
      { id: '3', name: 'Avocado', price: 1.75 },
      { id: '4', name: 'Spicy Mayo', price: 0.5 },
    ],
  };
  
  const handleAddToCart = useCallback(() => {
    const totalPrice = foodItem.price * quantity + selectedCustomizations.reduce((sum: number, customizationId: string) => {
      const customization = foodItem.customizations.find((c: CustomizationOption) => c.id === customizationId);
      return sum + (customization?.price || 0);
    }, 0);
    
    console.log('Added to cart:', { foodItem, quantity, selectedCustomizations, totalPrice });
    router.back();
  }, [foodItem, quantity, selectedCustomizations, router]);
  
  const handleCustomizationToggle = useCallback((customizationId: string) => {
    setSelectedCustomizations((prev: string[]) => {
      if (prev.includes(customizationId)) {
        return prev.filter((id: string) => id !== customizationId);
      } else {
        return [...prev, customizationId];
      }
    });
  }, []);
  
  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
  }, []);
  
  return (
    <ScrollView style={styles.container}>
      <FoodImage imageUrl={foodItem.imageUrl} name={foodItem.name} />
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.foodName}>{foodItem.name}</Text>
          <Text style={styles.price}>${foodItem.price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{foodItem.rating}</Text>
          <Text style={styles.preparationTime}>{foodItem.preparationTime} min</Text>
        </View>
        
        <Text style={styles.description}>{foodItem.description}</Text>
        
        <CustomizationOptions
          options={foodItem.customizations}
          selectedIds={selectedCustomizations}
          onToggle={handleCustomizationToggle}
        />
        
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
        />
        
        <AddToCartButton
          onPress={handleAddToCart}
          totalPrice={foodItem.price * quantity + selectedCustomizations.reduce((sum: number, id: string) => {
            const customization = foodItem.customizations.find((c: CustomizationOption) => c.id === id);
            return sum + (customization?.price || 0);
          }, 0)}
        />
      </View>
    </ScrollView>
  );
}
