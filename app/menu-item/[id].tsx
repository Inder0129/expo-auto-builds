import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addToCart, updateCartItem } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { QuantitySelector } from '@/src/components/menu-item/quantity-selector';
import { CustomizationOption } from '@/src/components/menu-item/customization-option';
import { AddToCartButton } from '@/src/components/menu-item/add-to-cart-button';
import { ItemDetail } from '@/src/components/menu-item/item-detail';
import styles from '@/src/styles/menu-item-detail';

interface MenuItemDetailScreenProps {}

const MenuItemDetailScreen: React.FC<MenuItemDetailScreenProps> = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: any) => state.cart.items);
  
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  const menuItem = useMemo(() => ({
    id: id || '',
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh lettuce, tomato, and special sauce',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: 'Burgers',
    rating: 4.5,
    preparationTime: 15,
    customizationOptions: [
      { id: '1', name: 'Spice Level', options: ['Mild', 'Medium', 'Spicy'], type: 'radio' },
      { id: '2', name: 'Extra Toppings', options: ['Cheese', 'Bacon', 'Avocado'], type: 'checkbox' },
    ],
  }), [id]);
  
  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
  }, []);
  
  const handleOptionSelect = useCallback((optionId: string, value: string) => {
    setSelectedOptions((prev: Record<string, string>) => ({
      ...prev,
      [optionId]: value,
    }));
  }, []);
  
  const handleAddToCart = useCallback(() => {
    const cartItem = {
      id: `${menuItem.id}-${Date.now()}`,
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
      options: selectedOptions,
      imageUrl: menuItem.imageUrl,
    };
    
    dispatch(addToCart(cartItem));
    router.back();
  }, [menuItem, quantity, selectedOptions, dispatch, router]);
  
  const existingCartItem = useMemo(() => {
    return cartItems.find((item: any) => item.menuItemId === menuItem.id);
  }, [cartItems, menuItem.id]);
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ItemDetail 
        item={menuItem}
        style={styles.itemDetail}
      />
      
      <Card style={styles.customizationSection}>
        <Text style={styles.sectionTitle}>Customization Options</Text>
        {menuItem.customizationOptions.map((option: any) => (
          <CustomizationOption
            key={option.id}
            option={option}
            selectedValue={selectedOptions[option.id]}
            onSelect={(value: string) => handleOptionSelect(option.id, value)}
            style={styles.customizationOption}
          />
        ))}
      </Card>
      
      <View style={styles.bottomSection}>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          style={styles.quantitySelector}
        />
        
        <AddToCartButton
          onPress={handleAddToCart}
          price={menuItem.price * quantity}
          existingItem={existingCartItem}
          style={styles.addToCartButton}
        />
      </View>
    </ScrollView>
  );
};

export default MenuItemDetailScreen;