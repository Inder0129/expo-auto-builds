import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '@/src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="restaurant/[id]" options={{ title: 'Restaurant' }} />
          <Stack.Screen name="menu-item/[id]" options={{ title: 'Menu Item' }} />
          <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
          <Stack.Screen name="order-tracking/[id]" options={{ title: 'Order Tracking' }} />
          <Stack.Screen name="addresses" options={{ title: 'Addresses' }} />
          <Stack.Screen name="search" options={{ title: 'Search' }} />
          <Stack.Screen name="offers" options={{ title: 'Offers' }} />
          <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </Provider>
  );
}