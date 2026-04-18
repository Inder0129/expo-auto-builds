import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

type TabIconName = 'home' | 'search' | 'receipt' | 'person' | 'cart';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }: { route: { name: string } }) => ({
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
          let iconName: TabIconName = 'home';
          if (route.name === 'index') iconName = 'home';
          else if (route.name === 'explore') iconName = 'search';
          else if (route.name === 'orders') iconName = 'receipt';
          else if (route.name === 'profile') iconName = 'person';
          else if (route.name === 'cart') iconName = 'cart';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="orders" options={{ title: 'Orders' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
    </Tabs>
  );
}