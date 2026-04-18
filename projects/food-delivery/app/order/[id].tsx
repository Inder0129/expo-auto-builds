import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { OrderStatus } from '@/src/components/order/order-status';
import { DeliveryMap } from '@/src/components/order/delivery-map';
import { DriverInfo } from '@/src/components/order/driver-info';
import { SupportButton } from '@/src/components/order/support-button';
import { styles } from '@/src/styles/order-tracking';
import { ViewStyle, TextStyle } from 'react-native';

type OrderStatusType = {
  id: string;
  title: string;
  description: string;
  time: string;
  isCompleted: boolean;
  isCurrent: boolean;
};

type DriverInfoType = {
  name: string;
  rating: number;
  vehicle: string;
  phoneNumber: string;
};

export default function OrderTrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const orderStatuses: OrderStatusType[] = [
    { id: '1', title: 'Order Placed', description: 'Your order has been received', time: '10:30 AM', isCompleted: true, isCurrent: false },
    { id: '2', title: 'Preparing', description: 'Restaurant is preparing your food', time: '10:45 AM', isCompleted: true, isCurrent: false },
    { id: '3', title: 'Ready for Pickup', description: 'Your order is ready for delivery', time: '11:00 AM', isCompleted: true, isCurrent: false },
    { id: '4', title: 'On the Way', description: 'Driver is on the way to you', time: '11:15 AM', isCompleted: false, isCurrent: true },
    { id: '5', title: 'Delivered', description: 'Order will be delivered soon', time: 'Estimated 11:30 AM', isCompleted: false, isCurrent: false },
  ];
  
  const driverInfo: DriverInfoType = {
    name: 'John Smith',
    rating: 4.8,
    vehicle: 'Toyota Prius • ABC123',
    phoneNumber: '+1 (555) 123-4567',
  };
  
  const estimatedDeliveryTime = '11:30 AM';
  
  const handleCallDriver = useCallback(() => {
    console.log('Calling driver:', driverInfo.phoneNumber);
  }, [driverInfo.phoneNumber]);
  
  const handleContactSupport = useCallback(() => {
    console.log('Contacting support');
  }, []);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{id}</Text>
        <Text style={styles.estimatedTime}>Estimated delivery: {estimatedDeliveryTime}</Text>
      </View>
      
      <OrderStatus statuses={orderStatuses} />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Location</Text>
        <DeliveryMap />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Driver</Text>
        <DriverInfo
          driver={driverInfo}
          onCall={handleCallDriver}
        />
      </View>
      
      <SupportButton onPress={handleContactSupport} />
    </ScrollView>
  );
}
