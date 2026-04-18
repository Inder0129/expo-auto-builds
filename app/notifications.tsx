import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationList from '@/src/components/notifications/notification-list';
import MarkAllRead from '@/src/components/notifications/mark-all-read';
import NotificationSettings from '@/src/components/notifications/notification-settings';
import { colors } from '@/src/theme';
import styles from '@/src/styles/notifications';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'order' | 'offer' | 'system';
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Order Confirmed', message: 'Your order #12345 has been confirmed', timestamp: '10 min ago', isRead: false, type: 'order' },
    { id: '2', title: 'New Offer', message: '50% off on your next order', timestamp: '2 hours ago', isRead: true, type: 'offer' },
    { id: '3', title: 'System Update', message: 'App maintenance scheduled for tonight', timestamp: '1 day ago', isRead: true, type: 'system' },
  ]);
  
  const [settings, setSettings] = useState<NotificationSetting[]>([
    { id: '1', title: 'Order Updates', description: 'Get notified about order status', enabled: true },
    { id: '2', title: 'Promotional Offers', description: 'Receive offers and discounts', enabled: true },
    { id: '3', title: 'System Notifications', description: 'App updates and maintenance', enabled: false },
  ]);
  
  const handleMarkAllRead = useCallback(() => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);
  
  const handleNotificationPress = useCallback((notificationId: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      )
    );
  }, []);
  
  const handleToggleSetting = useCallback((settingId: string) => {
    setSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.id === settingId ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  }, []);
  
  const unreadCount = notifications.filter((n: Notification) => !n.isRead).length;
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>
      
      <ScrollView style={styles.content}>
        <MarkAllRead
          onPress={handleMarkAllRead}
          disabled={unreadCount === 0}
        />
        
        <NotificationList
          notifications={notifications}
          onNotificationPress={handleNotificationPress}
        />
        
        <NotificationSettings
          settings={settings}
          onToggleSetting={handleToggleSetting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;