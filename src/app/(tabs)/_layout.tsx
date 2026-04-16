import { Tabs } from 'expo-router';
import { CalculatorIcon, HistoryIcon, SettingsIcon } from '@/components/icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#007AFF'
    }}>
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ color, size }) => (
            <CalculatorIcon color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <HistoryIcon color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}