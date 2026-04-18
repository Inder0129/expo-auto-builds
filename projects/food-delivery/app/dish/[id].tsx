import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addToCart } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { DishHeader } from '@/src/components/dish/dish-header';
import { CustomizationOption } from '@/src/components/dish/customization-option';
import { QuantitySelector } from '@/src/components/dish/quantity-selector';
import { AddToCartButton } from '@/src/components/dish/add-to-cart-button';
import { styles } from '@/src/styles/dish-detail';

interface Customization {
  id: string;
  name: string;
  options: string[];
  selectedOption: string;
}

type DishParams = {
  id: string;
};

export default function DishDetailScreen() {
  const params = useLocalSearchParams<DishParams>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const dishId = params.id;
  
  const [quantity, setQuantity] = useState<number>(1);
  const [customizations, setCustomizations] = useState<Customization[]>([
    { id: '1', name: 'Spice Level', options: ['Mild', 'Medium', 'Hot', 'Extra Hot'], selectedOption: 'Medium' },
    { id: '2', name: 'Add-ons', options: ['Extra Cheese', 'Extra Sauce', 'No Onions', 'Extra Veggies'], selectedOption: 'Extra Cheese' },
  ]);
  
  const dish = useMemo(() => ({
    id: dishId,
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a rich tomato and butter sauce with aromatic spices.',
    price: 12.99,
    rating: 4.5,
    preparationTime: '20-25 min',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
  }), [dishId]);
  
  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
  }, []);
  
  const handleCustomizationChange = useCallback((customizationId: string, option: string) => {
    setCustomizations(prev => prev.map(c => 
      c.id === customizationId ? { ...c, selectedOption: option } : c
    ));
  }, []);
  
  const handleAddToCart = useCallback(() => {
    const selectedCustomizations = customizations.map(c => ({
      name: c.name,
      option: c.selectedOption,
    }));
    
    dispatch(addToCart({
      dishId: dish.id,
      name: dish.name,
      price: dish.price,
      quantity,
      customizations: selectedCustomizations,
      imageUrl: dish.imageUrl,
    }));
    
    router.back();
  }, [dish, quantity, customizations, dispatch, router]);
  
  const totalPrice = useMemo(() => dish.price * quantity, [dish.price, quantity]);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DishHeader 
          name={dish.name}
          rating={dish.rating}
          preparationTime={dish.preparationTime}
          imageUrl={dish.imageUrl}
        />
        
        <View style={styles.contentContainer}>
          <Text style={styles.description}>{dish.description}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customize Your Dish</Text>
            {customizations.map((customization: Customization) => (
              <CustomizationOption
                key={customization.id}
                name={customization.name}
                options={customization.options}
                selectedOption={customization.selectedOption}
                onSelect={(option: string) => handleCustomizationChange(customization.id, option)}
              />
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>
        <AddToCartButton
          onPress={handleAddToCart}
          disabled={false}
        />
      </View>
    </SafeAreaView>
  );
}
