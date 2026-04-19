import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '@/src/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="photo-detail" options={{ title: 'Photo Detail' }} />
        <Stack.Screen name="edit-photo" options={{ title: 'Edit Photo' }} />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}