import { Tabs } from 'expo-router';
import { CalculatorIcon, FunctionIcon, HistoryIcon } from '../../src/components/icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Basic',
          tabBarIcon: ({ color, size }) => <CalculatorIcon color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="scientific"
        options={{
          title: 'Scientific',
          tabBarIcon: ({ color, size }) => <FunctionIcon color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <HistoryIcon color={color} size={size} />
        }}
      />
    </Tabs>
  );
}