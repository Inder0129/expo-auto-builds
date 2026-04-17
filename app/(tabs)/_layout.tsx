import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';

type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
};

function TabIcon({ name, color, size }: TabIconProps) {
  return <Ionicons name={name} color={color} size={size} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Basic',
          tabBarIcon: ({ color, size }) => <TabIcon name="calculator" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="scientific"
        options={{
          title: 'Scientific',
          tabBarIcon: ({ color, size }) => <TabIcon name="flask" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <TabIcon name="time" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}