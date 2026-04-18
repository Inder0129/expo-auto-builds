import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { SuccessAnimation } from '@/src/components/order-success/success-animation';
import { OrderDetails } from '@/src/components/order-success/order-details';
import { TrackOrderButton } from '@/src/components/order-success/track-order-button';
import { ContinueShopping } from '@/src/components/order-success/continue-shopping';
import { styles } from '@/src/styles/order-success';

type OrderParams = {
  orderId?: string;
  total?: string;
  estimatedTime?: string;
};

export default function OrderSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<OrderParams>();

  const orderData = useMemo(() => ({
    id: params.orderId || 'ORD-123456',
    total: params.total || '$24.99',
    estimatedTime: params.estimatedTime || '25-30',
  }), [params]);

  const handleTrackOrder = () => {
    router.push('/orders');
  };

  const handleContinueShopping = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SuccessAnimation />
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your order has been placed successfully
        </Text>
        <OrderDetails order={orderData} />
        <TrackOrderButton onPress={handleTrackOrder} />
        <ContinueShopping onPress={handleContinueShopping} />
      </ScrollView>
    </SafeAreaView>
  );
}
