import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/src/theme';
import { NotificationItem } from '@/src/components/notifications/notification-item';
import { EmptyNotifications } from '@/src/components/notifications/empty-notifications';
import { ClearAllButton } from '@/src/components/notifications/clear-all-button';
import { styles } from '@/src/styles/notifications';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'offer' | 'system' | 'promotion';
  read: boolean;
  orderId?: string;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Order Delivered',
      message: 'Your order #ORD12345 has been delivered successfully.',
      time: '10 min ago',
      type: 'order',
      read: false,
      orderId: 'ORD12345',
    },
    {
      id: '2',
      title: 'New Offer Available',
      message: 'Get 30% off on your next pizza order. Use code PIZZA30.',
      time: '1 hour ago',
      type: 'offer',
      read: false,
    },
    {
      id: '3',
      title: 'System Update',
      message: 'App maintenance scheduled for tonight 2 AM to 4 AM.',
      time: '3 hours ago',
      type: 'system',
      read: true,
    },
    {
      id: '4',
      title: 'Weekend Special',
      message: 'Enjoy free delivery on all orders this weekend!',
      time: '1 day ago',
      type: 'promotion',
      read: true,
    },
    {
      id: '5',
      title: 'Order Confirmed',
      message: 'Your order #ORD12344 has been confirmed and is being prepared.',
      time: '2 days ago',
      type: 'order',
      read: true,
      orderId: 'ORD12344',
    },
  ]);

  const handleMarkAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const handleClearAll = useCallback(() => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setNotifications([]),
        },
      ]
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderNotificationItem = useCallback(({ item }: { item: Notification }) => (
    <NotificationItem
      notification={item}
      onPress={() => handleMarkAsRead(item.id)}
      onDelete={() => handleDelete(item.id)}
    />
  ), [handleMarkAsRead, handleDelete]);

  if (notifications.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <EmptyNotifications />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount} unread</Text>
          )}
        </View>
        <ClearAllButton onPress={handleClearAll} />
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item: Notification) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
