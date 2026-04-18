import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
        <Stack.Screen name="food/[id]" options={{ title: 'Food Details' }} />
        <Stack.Screen name="order/[id]" options={{ title: 'Order Tracking' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
