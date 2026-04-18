import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/src/components/ui/button';
import { colors } from '@/src/theme';
import { styles } from './order-card.styles';

interface OrderCardProps {
  order: {
    id: string;
    orderNumber: string;
    date: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
    }>;
  };
  isExpanded: boolean;
  onPress: () => void;
  onTrack: () => void;
  onReorder: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, isExpanded, onPress, onTrack, onReorder }) => {
  const statusColors = {
    pending: colors.status.warning,
    processing: colors.status.info,
    shipped: colors.status.primary,
    delivered: colors.status.success,
    cancelled: colors.status.danger,
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <Text style={styles.date}>{order.date}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: statusColors[order.status] }]} />
          <Text style={styles.statusText}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Text>
        </View>
      </View>

      <View style={styles.summary}>
        <Text style={styles.total}>${order.total.toFixed(2)}</Text>
        <Text style={styles.itemsCount}>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</Text>
      </View>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <View style={styles.itemsList}>
            {order.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>x{item.quantity} • ${item.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actions}>
            <Button
              title="Track Order"
              onPress={onTrack}
              variant="outline"
              size="small"
              style={styles.actionButton}
            />
            <Button
              title="Reorder"
              onPress={onReorder}
              variant="primary"
              size="small"
              style={styles.actionButton}
            />
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.text.secondary}
        />
      </View>
    </TouchableOpacity>
  );
};
