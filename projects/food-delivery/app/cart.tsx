import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import CartItem from '@/src/components/cart/cart-item';
import PriceSummary from '@/src/components/cart/price-summary';
import DeliveryAddressSelector from '@/src/components/cart/delivery-address-selector';
import styles from '@/src/styles/cart';

type Address = {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
};

export default function CartScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: any) => state.cart.items);
  const restaurant = useAppSelector((state: any) => state.cart.restaurant);
  
  const [selectedAddress, setSelectedAddress] = useState<Address>({
    id: '1',
    name: 'Home',
    address: '123 Main St, City, State 12345',
    isDefault: true,
  });
  
  const addresses: Address[] = useMemo(() => [
    { id: '1', name: 'Home', address: '123 Main St, City, State 12345', isDefault: true },
    { id: '2', name: 'Work', address: '456 Office Ave, City, State 12345', isDefault: false },
  ], []);
  
  const subtotal = useMemo(() => {
    return cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  }, [cartItems]);
  
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  
  const handleRemoveItem = useCallback((id: string) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);
  
  const handleUpdateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(id);
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  }, [dispatch, handleRemoveItem]);
  
  const handleClearCart = useCallback(() => {
    Alert.alert('Clear Cart', 'Remove all items from cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => dispatch(clearCart()),
      },
    ]);
  }, [dispatch]);
  
  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Add items to cart before checkout');
      return;
    }
    router.push('/checkout');
  }, [cartItems.length, router]);
  
  const handleSelectAddress = useCallback((address: Address) => {
    setSelectedAddress(address);
  }, []);
  
  const handleAddAddress = useCallback(() => {
    router.push('/addresses');
  }, [router]);
  
  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer} edges={['top']}>
        <View style={styles.emptyContent}>
          <Ionicons name="cart-outline" size={80} color={colors.textLight} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add delicious food from restaurants</Text>
          <Button
            title="Browse Restaurants"
            onPress={() => router.push('/(tabs)/explore')}
            style={styles.browseButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Cart</Text>
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>
        
        {restaurant && (
          <Card style={styles.restaurantCard}>
            <View style={styles.restaurantInfo}>
              <Ionicons name="restaurant-outline" size={20} color={colors.primary} />
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
            </View>
          </Card>
        )}
        
        <View style={styles.itemsContainer}>
          {cartItems.map((item: any) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => handleRemoveItem(item.id)}
              onUpdateQuantity={(quantity: number) => handleUpdateQuantity(item.id, quantity)}
            />
          ))}
        </View>
        
        <DeliveryAddressSelector
          addresses={addresses}
          selectedAddress={selectedAddress}
          onSelectAddress={handleSelectAddress}
          onAddAddress={handleAddAddress}
        />
        
        <PriceSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          total={total}
        />
        
        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>Special Instructions</Text>
          <Text style={styles.noteText}>Add any special requests for your order</Text>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <Button
          title="Proceed to Checkout"
          onPress={handleCheckout}
          style={styles.checkoutButton}
        />
      </View>
    </SafeAreaView>
  );
}
