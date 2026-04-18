import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addToCart, updateCartItem } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { ItemDetail } from '@/src/components/menu-item/item-detail';
import { CustomizationOption } from '@/src/components/menu-item/customization-option';
import { QuantitySelector } from '@/src/components/menu-item/quantity-selector';
import { AddToCartButton } from '@/src/components/menu-item/add-to-cart-button';
import { styles } from '@/src/styles/menu-item-detail';

interface MenuItemDetailScreenProps {}

interface Customization {
  id: string;
  name: string;
  options: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

const MenuItemDetailScreen: React.FC<MenuItemDetailScreenProps> = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: any) => state.cart.items);
  
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string>>({});
  
  const menuItem = useMemo(() => ({
    id: id || '',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Pizza',
    rating: 4.5,
    preparationTime: 20,
    customizations: [
      {
        id: 'size',
        name: 'Size',
        options: [
          { id: 'small', name: 'Small', price: 0 },
          { id: 'medium', name: 'Medium', price: 2 },
          { id: 'large', name: 'Large', price: 4 }
        ]
      },
      {
        id: 'crust',
        name: 'Crust',
        options: [
          { id: 'thin', name: 'Thin Crust', price: 0 },
          { id: 'thick', name: 'Thick Crust', price: 1.5 }
        ]
      }
    ] as Customization[]
  }), [id]);
  
  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
  }, []);
  
  const handleCustomizationSelect = useCallback((customizationId: string, optionId: string) => {
    setSelectedCustomizations((prev: Record<string, string>) => ({
      ...prev,
      [customizationId]: optionId
    }));
  }, []);
  
  const handleAddToCart = useCallback(() => {
    const cartItem = {
      id: `${menuItem.id}-${Date.now()}`,
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
      customizations: selectedCustomizations,
      imageUrl: menuItem.imageUrl
    };
    
    dispatch(addToCart(cartItem));
    router.back();
  }, [menuItem, quantity, selectedCustomizations, dispatch, router]);
  
  const totalPrice = useMemo(() => {
    let basePrice = menuItem.price * quantity;
    
    Object.entries(selectedCustomizations).forEach(([customizationId, optionId]) => {
      const customization = menuItem.customizations.find((c: Customization) => c.id === customizationId);
      if (customization) {
        const option = customization.options.find((o: any) => o.id === optionId);
        if (option) {
          basePrice += option.price * quantity;
        }
      }
    });
    
    return basePrice;
  }, [menuItem, quantity, selectedCustomizations]);
  
  return (
    <ScrollView style={styles.container}>
      <ItemDetail 
        name={menuItem.name}
        description={menuItem.description}
        price={menuItem.price}
        imageUrl={menuItem.imageUrl}
        rating={menuItem.rating}
        preparationTime={menuItem.preparationTime}
      />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customizations</Text>
        {menuItem.customizations.map((customization: Customization) => (
          <CustomizationOption
            key={customization.id}
            customization={customization}
            selectedOptionId={selectedCustomizations[customization.id]}
            onSelect={(optionId: string) => handleCustomizationSelect(customization.id, optionId)}
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
    </ScrollView>
  );
};

export default MenuItemDetailScreen;