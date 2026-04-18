import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product-listing" options={{ headerShown: true, title: 'Products' }} />
        <Stack.Screen name="product-detail" options={{ headerShown: true, title: 'Product Details' }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
