import { Tabs } from 'expo-router';
import { TabHeader } from '@/components/ui';
import '@/styles/tabs/layout';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      header: (props) => <TabHeader {...props} />,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Calculator' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
