import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Switch, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { SettingsList } from '@/src/components/settings/settings-list';
import { ThemeToggle } from '@/src/components/settings/theme-toggle';
import { AnimatedSlider } from '@/src/components/settings/animated-slider';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { settingsStyles } from '@/src/styles/settings';

interface SettingsItem {
  id: string;
  title: string;
  description: string;
  type: 'toggle' | 'slider' | 'select';
  value: boolean | number;
}

export default function SettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsItem[]>([
    { id: '1', title: 'Notifications', description: 'Enable push notifications', type: 'toggle', value: true },
    { id: '2', title: 'Sound Effects', description: 'Toggle sound effects', type: 'toggle', value: false },
    { id: '3', title: 'Font Size', description: 'Adjust text size', type: 'slider', value: 50 },
    { id: '4', title: 'Brightness', description: 'Screen brightness level', type: 'slider', value: 75 },
  ]);

  const handleToggleChange = useCallback((id: string, value: boolean) => {
    setSettings((prev: SettingsItem[]) => 
      prev.map((item: SettingsItem) => 
        item.id === id ? { ...item, value } : item
      )
    );
  }, []);

  const handleSliderChange = useCallback((id: string, value: number) => {
    setSettings((prev: SettingsItem[]) => 
      prev.map((item: SettingsItem) => 
        item.id === id ? { ...item, value } : item
      )
    );
  }, []);

  const handleSave = useCallback(() => {
    router.back();
  }, [router]);

  const headerScale = useSharedValue(1);
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
  }));

  const handleHeaderPress = useCallback(() => {
    headerScale.value = withSpring(headerScale.value === 1 ? 1.05 : 1);
  }, [headerScale]);

  return (
    <ScrollView style={settingsStyles.container} contentContainerStyle={settingsStyles.contentContainer}>
      <Animated.View style={[settingsStyles.header, headerAnimatedStyle]}>
        <Text style={settingsStyles.title} onPress={handleHeaderPress}>Settings</Text>
        <Text style={settingsStyles.subtitle}>Customize your experience</Text>
      </Animated.View>

      <Card style={settingsStyles.section}>
        <Text style={settingsStyles.sectionTitle}>Appearance</Text>
        <ThemeToggle />
      </Card>

      <Card style={settingsStyles.section}>
        <Text style={settingsStyles.sectionTitle}>Preferences</Text>
        <SettingsList 
          items={settings} 
          onToggleChange={handleToggleChange} 
          onSliderChange={handleSliderChange} 
        />
      </Card>

      <Card style={settingsStyles.section}>
        <Text style={settingsStyles.sectionTitle}>Advanced</Text>
        <AnimatedSlider 
          label="Animation Speed" 
          value={50} 
          onValueChange={(value: number) => console.log(value)} 
          min={0} 
          max={100} 
        />
      </Card>

      <View style={settingsStyles.actions}>
        <Button title="Save Changes" onPress={handleSave} variant="primary" style={settingsStyles.saveButton} />
        <Button title="Cancel" onPress={() => router.back()} variant="outline" style={settingsStyles.cancelButton} />
      </View>
    </ScrollView>
  );
}
