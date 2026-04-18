import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addToCart } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { ItemDetail } from '@/src/components/menu-item/item-detail';
import { CustomizationOption } from '@/src/components/menu-item/customization-option';
import { QuantitySelector } from '@/src/components/menu-item/quantity-selector';
import { AddToCartButton } from '@/src/components/menu-item/add-to-cart-button';
import styles from '@/src/styles/menu-item-detail';

interface MenuItemDetailScreenProps {}

type CustomizationOptionType = {
  id: string;
  name: string;
  price: number;
  selected: boolean;
};

type MenuItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  available: boolean;
};

export default function MenuItemDetailScreen(props: MenuItemDetailScreenProps) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<CustomizationOptionType[]>([
    { id: '1', name: 'Extra Cheese', price: 1.5, selected: false },
    { id: '2', name: 'Spicy', price: 0, selected: false },
    { id: '3', name: 'No Onions', price: 0, selected: false },
  ]);

  const menuItem: MenuItemType = useMemo(() => ({
    id: id || '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    category: 'Pizza',
    available: true,
  }), [id]);

  const totalPrice = useMemo(() => {
    const basePrice = menuItem.price * quantity;
    const optionsPrice = selectedOptions
      .filter((option: CustomizationOptionType) => option.selected)
      .reduce((sum: number, option: CustomizationOptionType) => sum + option.price, 0);
    return basePrice + optionsPrice;
  }, [menuItem.price, quantity, selectedOptions]);

  const handleOptionToggle = useCallback((optionId: string) => {
    setSelectedOptions((prev: CustomizationOptionType[]) => 
      prev.map((option: CustomizationOptionType) => 
        option.id === optionId ? { ...option, selected: !option.selected } : option
      )
    );
  }, []);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
  }, []);

  const handleAddToCart = useCallback(() => {
    const selectedCustomizations = selectedOptions
      .filter((option: CustomizationOptionType) => option.selected)
      .map((option: CustomizationOptionType) => ({ id: option.id, name: option.name, price: option.price }));
    
    dispatch(addToCart({
      itemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
      customizations: selectedCustomizations,
      totalPrice,
    }));
  }, [dispatch, menuItem, quantity, selectedOptions, totalPrice]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ItemDetail 
        item={menuItem} 
        style={styles.itemDetail} 
      />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customizations</Text>
        {selectedOptions.map((option: CustomizationOptionType) => (
          <CustomizationOption
            key={option.id}
            option={option}
            onToggle={handleOptionToggle}
            style={styles.customizationOption}
          />
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quantity</Text>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          style={styles.quantitySelector}
        />
      </View>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>
        <AddToCartButton
          onPress={handleAddToCart}
          disabled={!menuItem.available}
          style={styles.addToCartButton}
        />
      </View>
    </ScrollView>
  );
}
