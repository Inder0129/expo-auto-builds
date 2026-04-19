import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="video-detail" options={{ title: 'Video Detail' }} />
        <Stack.Screen name="concept-detail" options={{ title: 'Concept Detail' }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}