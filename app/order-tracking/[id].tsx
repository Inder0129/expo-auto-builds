import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TrackingStepper } from '@/src/components/order-tracking';
import { DeliveryPersonCard } from '@/src/components/order-tracking';
import { colors } from '@/src/theme';
import orderTrackingStyles from '@/src/styles/order-tracking';

interface OrderStatus {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  time?: string;
}

interface DeliveryPerson {
  name: string;
  phone: string;
  rating: number;
  vehicle: string;
  eta: string;
}

const OrderTrackingScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [orderStatus, setOrderStatus] = useState<OrderStatus[]>([
    { id: '1', title: 'Order Placed', description: 'Your order has been placed', completed: true, time: '10:30 AM' },
    { id: '2', title: 'Order Confirmed', description: 'Restaurant has confirmed your order', completed: true, time: '10:35 AM' },
    { id: '3', title: 'Food Preparing', description: 'Chef is preparing your food', completed: true, time: '10:45 AM' },
    { id: '4', title: 'Out for Delivery', description: 'Your food is on the way', completed: false, time: 'Estimated 11:15 AM' },
    { id: '5', title: 'Delivered', description: 'Enjoy your meal!', completed: false }
  ]);

  const [deliveryPerson, setDeliveryPerson] = useState<DeliveryPerson>({
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    rating: 4.8,
    vehicle: 'Motorcycle',
    eta: '15-20 min'
  });

  const [timeRemaining, setTimeRemaining] = useState<string>('20 min');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev: string) => {
        const minutes = parseInt(prev.split(' ')[0]);
        if (minutes > 1) {
          return `${minutes - 1} min`;
        }
        return 'Arriving soon';
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleCallDeliveryPerson = useCallback(() => {
    console.log('Calling delivery person:', deliveryPerson.phone);
  }, [deliveryPerson]);

  const handleMessageDeliveryPerson = useCallback(() => {
    console.log('Messaging delivery person:', deliveryPerson.phone);
  }, [deliveryPerson]);

  return (
    <SafeAreaView style={orderTrackingStyles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={orderTrackingStyles.header}>
          <Text style={orderTrackingStyles.orderId}>Order #{id}</Text>
          <Text style={orderTrackingStyles.timeRemaining}>Arriving in {timeRemaining}</Text>
        </View>

        <View style={orderTrackingStyles.statusContainer}>
          <Text style={orderTrackingStyles.sectionTitle}>Order Status</Text>
          <TrackingStepper steps={orderStatus} />
        </View>

        <View style={orderTrackingStyles.deliveryContainer}>
          <Text style={orderTrackingStyles.sectionTitle}>Your Delivery Person</Text>
          <DeliveryPersonCard
            person={deliveryPerson}
            onCall={handleCallDeliveryPerson}
            onMessage={handleMessageDeliveryPerson}
          />
        </View>

        <View style={orderTrackingStyles.restaurantInfo}>
          <Text style={orderTrackingStyles.sectionTitle}>Restaurant Info</Text>
          <View style={orderTrackingStyles.infoCard}>
            <Ionicons name="restaurant" size={24} color={colors.primary} />
            <View style={orderTrackingStyles.infoContent}>
              <Text style={orderTrackingStyles.infoTitle}>Pizza Palace</Text>
              <Text style={orderTrackingStyles.infoText}>123 Food Street, New York</Text>
              <Text style={orderTrackingStyles.infoText}>Open until 11:00 PM</Text>
            </View>
          </View>
        </View>

        <View style={orderTrackingStyles.orderDetails}>
          <Text style={orderTrackingStyles.sectionTitle}>Order Details</Text>
          <View style={orderTrackingStyles.detailsCard}>
            <View style={orderTrackingStyles.detailRow}>
              <Text style={orderTrackingStyles.detailLabel}>Items Total</Text>
              <Text style={orderTrackingStyles.detailValue}>$24.99</Text>
            </View>
            <View style={orderTrackingStyles.detailRow}>
              <Text style={orderTrackingStyles.detailLabel}>Delivery Fee</Text>
              <Text style={orderTrackingStyles.detailValue}>$2.99</Text>
            </View>
            <View style={orderTrackingStyles.detailRow}>
              <Text style={orderTrackingStyles.detailLabel}>Tax</Text>
              <Text style={orderTrackingStyles.detailValue}>$2.25</Text>
            </View>
            <View style={[orderTrackingStyles.detailRow, orderTrackingStyles.totalRow]}>
              <Text style={orderTrackingStyles.totalLabel}>Total</Text>
              <Text style={orderTrackingStyles.totalValue}>$30.23</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderTrackingScreen;