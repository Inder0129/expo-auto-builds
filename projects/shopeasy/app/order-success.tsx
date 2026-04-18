import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/src/components/ui';
import { SuccessAnimation } from '@/src/components/order-success/success-animation';
import { OrderDetails } from '@/src/components/order-success/order-details';
import { colors, spacing, typography } from '@/src/theme';
import { orderSuccessStyles } from '@/src/styles/order-success';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function OrderSuccessScreen() {
  const router = useRouter();
  
  const orderNumber = 'ORD-2024-00123';
  const estimatedDelivery = 'Jan 25, 2024';
  const trackingNumber = 'TRK-789456123';
  
  const orderItems: OrderItem[] = [
    { id: '1', name: 'Product 1', price: 29.99, quantity: 2 },
    { id: '2', name: 'Product 2', price: 19.99, quantity: 1 },
  ];
  
  const subtotal = orderItems.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  const handleContinueShopping = useCallback(() => {
    router.push('/(tabs)');
  }, [router]);
  
  const handleViewOrders = useCallback(() => {
    router.push('/(tabs)/orders');
  }, [router]);
  
  const handleTrackOrder = useCallback(() => {
    console.log('Track order:', trackingNumber);
  }, [trackingNumber]);
  
  return (
    <ScrollView style={orderSuccessStyles.container}>
      <View style={orderSuccessStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={orderSuccessStyles.headerTitle}>Order Confirmation</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={orderSuccessStyles.content}>
        <SuccessAnimation />
        
        <Text style={orderSuccessStyles.title}>Order Placed Successfully!</Text>
        <Text style={orderSuccessStyles.message}>
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </Text>
        
        <View style={orderSuccessStyles.infoCard}>
          <View style={orderSuccessStyles.infoRow}>
            <Text style={orderSuccessStyles.infoLabel}>Order Number:</Text>
            <Text style={orderSuccessStyles.infoValue}>{orderNumber}</Text>
          </View>
          <View style={orderSuccessStyles.infoRow}>
            <Text style={orderSuccessStyles.infoLabel}>Estimated Delivery:</Text>
            <Text style={orderSuccessStyles.infoValue}>{estimatedDelivery}</Text>
          </View>
          <View style={orderSuccessStyles.infoRow}>
            <Text style={orderSuccessStyles.infoLabel}>Tracking Number:</Text>
            <Text style={orderSuccessStyles.infoValue}>{trackingNumber}</Text>
          </View>
        </View>
        
        <OrderDetails 
          items={orderItems}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />
        
        <View style={orderSuccessStyles.actionButtons}>
          <Button 
            title="Continue Shopping"
            onPress={handleContinueShopping}
            variant="outline"
            style={orderSuccessStyles.continueButton}
          />
          <Button 
            title="Track Order"
            onPress={handleTrackOrder}
            style={orderSuccessStyles.trackButton}
          />
        </View>
        
        <TouchableOpacity 
          style={orderSuccessStyles.viewOrdersButton}
          onPress={handleViewOrders}
        >
          <Text style={orderSuccessStyles.viewOrdersText}>View All Orders</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
