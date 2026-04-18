import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Card } from '@/src/components/ui';
import { Button } from '@/src/components/ui';
import { useAppSelector } from '@/src/store/hooks';
import { Order } from '@/src/store/slices/orders';
import { styles } from '@/src/styles/orders';

interface OrderCardProps {
  order: Order;
  onPress: (id: string) => void;
  onTrackPress: (id: string) => void;
  onReorderPress: (id: string) => void;
}

interface TrackingStepperProps {
  currentStep: number;
  steps: string[];
}

interface EmptyStateProps {
  title: string;
  description: string;
  icon: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress, onTrackPress, onReorderPress }) => {
  const handlePress = useCallback(() => {
    onPress(order.id);
  }, [order.id, onPress]);

  const handleTrackPress = useCallback(() => {
    onTrackPress(order.id);
  }, [order.id, onTrackPress]);

  const handleReorderPress = useCallback(() => {
    onReorderPress(order.id);
  }, [order.id, onReorderPress]);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'delivered': return colors.success;
      case 'cancelled': return colors.error;
      case 'preparing': return colors.warning;
      case 'on_the_way': return colors.info;
      default: return colors.gray;
    }
  }, []);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.orderCard}>
      <Card style={styles.orderCardInner}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Order #{order.id.slice(0, 8)}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(order.status) }
          ]}>
            <Text style={styles.statusText}>{order.status.replace('_', ' ').toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          {order.items.slice(0, 2).map((item: OrderItem) => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
          ))}
          {order.items.length > 2 && (
            <Text style={styles.moreItems}>+{order.items.length - 2} more items</Text>
          )}
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>
          <View style={styles.orderActions}>
            {order.status === 'on_the_way' && (
              <Button
                title="Track Order"
                variant="outline"
                size="small"
                onPress={handleTrackPress}
                style={styles.trackButton}
              />
            )}
            {order.status === 'delivered' && (
              <Button
                title="Reorder"
                variant="primary"
                size="small"
                onPress={handleReorderPress}
                style={styles.reorderButton}
              />
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const TrackingStepper: React.FC<TrackingStepperProps> = ({ currentStep, steps }) => {
  return (
    <View style={styles.stepperContainer}>
      {steps.map((step: string, index: number) => (
        <React.Fragment key={step}>
          <View style={styles.stepContainer}>
            <View style={[
              styles.stepCircle,
              index <= currentStep && styles.stepCircleActive
            ]}>
              {index < currentStep ? (
                <Ionicons name="checkmark" size={16} color={colors.white} />
              ) : (
                <Text style={[
                  styles.stepNumber,
                  index <= currentStep && styles.stepNumberActive
                ]}>
                  {index + 1}
                </Text>
              )}
            </View>
            <Text style={[
              styles.stepLabel,
              index <= currentStep && styles.stepLabelActive
            ]}>
              {step}
            </Text>
          </View>
          {index < steps.length - 1 && (
            <View style={[
              styles.stepLine,
              index < currentStep && styles.stepLineActive
            ]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  icon, 
  buttonText, 
  onButtonPress 
}) => {
  const handleButtonPress = useCallback(() => {
    onButtonPress?.();
  }, [onButtonPress]);

  return (
    <View style={styles.emptyState}>
      <Ionicons name={icon as any} size={64} color={colors.grayLight} />
      <Text style={styles.emptyStateTitle}>{title}</Text>
      <Text style={styles.emptyStateDescription}>{description}</Text>
      {buttonText && onButtonPress && (
        <Button
          title={buttonText}
          variant="primary"
          onPress={handleButtonPress}
          style={styles.emptyStateButton}
        />
      )}
    </View>
  );
};

export default function OrdersScreen() {
  const router = useRouter();
  const orders = useAppSelector((state: RootState) => state.orders.list);
  const activeOrders = useMemo(() => {
    return orders.filter((order: Order) => 
      ['preparing', 'on_the_way'].includes(order.status)
    );
  }, [orders]);

  const pastOrders = useMemo(() => {
    return orders.filter((order: Order) => 
      ['delivered', 'cancelled'].includes(order.status)
    );
  }, [orders]);

  const handleOrderPress = useCallback((id: string) => {
    // Navigate to order details
  }, []);

  const handleTrackPress = useCallback((id: string) => {
    router.push(`/order-tracking/${id}`);
  }, [router]);

  const handleReorderPress = useCallback((id: string) => {
    // Implement reorder logic
  }, []);

  const handleBrowseRestaurants = useCallback(() => {
    router.push('/explore');
  }, [router]);

  const renderOrderItem = useCallback(({ item }: { item: Order }) => (
    <OrderCard
      order={item}
      onPress={handleOrderPress}
      onTrackPress={handleTrackPress}
      onReorderPress={handleReorderPress}
    />
  ), [handleOrderPress, handleTrackPress, handleReorderPress]);

  if (orders.length === 0) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.emptyContainer}>
        <EmptyState
          title="No Orders Yet"
          description="You haven't placed any orders yet. Browse restaurants and order your favorite food!"
          icon="fast-food-outline"
          buttonText="Browse Restaurants"
          onButtonPress={handleBrowseRestaurants}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {activeOrders.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Orders</Text>
          {activeOrders.map((order: Order) => (
            <OrderCard
              key={order.id}
              order={order}
              onPress={handleOrderPress}
              onTrackPress={handleTrackPress}
              onReorderPress={handleReorderPress}
            />
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Orders</Text>
        {pastOrders.length === 0 ? (
          <EmptyState
            title="No Past Orders"
            description="Your past orders will appear here"
            icon="receipt-outline"
          />
        ) : (
          pastOrders.map((order: Order) => (
            <OrderCard
              key={order.id}
              order={order}
              onPress={handleOrderPress}
              onTrackPress={handleTrackPress}
              onReorderPress={handleReorderPress}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}