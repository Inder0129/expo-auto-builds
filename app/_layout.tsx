import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '../src/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="restaurant/[id]" options={{ title: 'Restaurant' }} />
        <Stack.Screen name="cart" options={{ title: 'Cart' }} />
        <Stack.Screen name="addresses" options={{ title: 'Addresses' }} />
        <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}