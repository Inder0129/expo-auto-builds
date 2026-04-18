import React, { useMemo } from 'react';
import { View, ScrollView, Text, SafeAreaView } from 'react-native';
import { CartItem } from '@/src/components/cart/cart-item';
import { PriceSummary } from '@/src/components/cart/price-summary';
import { CheckoutButton } from '@/src/components/cart/checkout-button';
import { EmptyCart } from '@/src/components/cart/empty-cart';
import { styles } from '@/src/styles/cart';

type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantName: string;
};

export default function CartScreen() {
  const cartItems: CartItemType[] = [
    { id: '1', name: 'Margherita Pizza', price: 12.99, quantity: 1, image: '', restaurantName: 'Pizza Palace' },
    { id: '2', name: 'Garlic Bread', price: 4.99, quantity: 2, image: '', restaurantName: 'Pizza Palace' },
    { id: '3', name: 'Coca Cola', price: 1.99, quantity: 1, image: '', restaurantName: 'Pizza Palace' },
  ];

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum: number, item: CartItemType) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    console.log('Quantity changed:', id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    console.log('Remove item:', id);
  };

  const handleCheckout = () => {
    console.log('Checkout pressed');
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.itemsContainer}>
          {cartItems.map((item: CartItemType) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
              restaurantName={item.restaurantName}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))}
        </View>

        <PriceSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          total={total}
        />
      </ScrollView>

      <View style={styles.checkoutContainer}>
        <CheckoutButton total={total} onPress={handleCheckout} />
      </View>
    </SafeAreaView>
  );
}
