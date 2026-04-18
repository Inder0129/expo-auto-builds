import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { NotificationCard } from '@/src/components/notifications/notification-card';
import { MarkAllRead } from '@/src/components/notifications/mark-all-read';
import { NotificationSettings } from '@/src/components/notifications/notification-settings';
import { notificationsStyles } from '@/src/styles/notifications';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  type: 'order' | 'promo' | 'system' | 'restaurant';
  read: boolean;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Order Confirmed',
      message: 'Your order #ORD12345 has been confirmed',
      timestamp: Date.now() - 300000,
      type: 'order',
      read: false,
    },
    {
      id: '2',
      title: 'Special Offer',
      message: 'Get 30% off on your next order with code SAVE30',
      timestamp: Date.now() - 86400000,
      type: 'promo',
      read: true,
    },
    {
      id: '3',
      title: 'System Update',
      message: 'New features added to the app',
      timestamp: Date.now() - 172800000,
      type: 'system',
      read: true,
    },
    {
      id: '4',
      title: 'Restaurant Update',
      message: 'Your favorite restaurant is now open',
      timestamp: Date.now() - 259200000,
      type: 'restaurant',
      read: false,
    },
  ]);

  const handleMarkAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  }, []);

  const handleClearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  const renderNotification = useCallback(({ item }: { item: Notification }) => (
    <NotificationCard
      notification={item}
      onPress={() => handleMarkAsRead(item.id)}
    />
  ), [handleMarkAsRead]);

  return (
    <View style={notificationsStyles.container}>
      <Stack.Screen
        options={{
          headerTitle: `Notifications${unreadCount > 0 ? ` (${unreadCount})` : ''}`,
          headerRight: () => (
            <MarkAllRead
              onMarkAllRead={handleMarkAllRead}
              onClearAll={handleClearAll}
            />
          ),
        }}
      />
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item: Notification) => item.id}
          contentContainerStyle={notificationsStyles.list}
        />
      ) : (
        <View style={notificationsStyles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={64} color={colors.muted} />
          <Text style={notificationsStyles.emptyText}>No notifications</Text>
        </View>
      )}
      <NotificationSettings />
    </View>
  );
}
