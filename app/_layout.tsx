import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '@/src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="restaurant/[id]" />
          <Stack.Screen name="menu-item/[id]" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="order-tracking/[id]" />
          <Stack.Screen name="addresses" />
          <Stack.Screen name="search" />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </Provider>
  );
}