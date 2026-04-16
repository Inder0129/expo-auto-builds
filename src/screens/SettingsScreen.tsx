import React, { useCallback, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { SettingsSection, ThemeToggle } from '@/components/settings';
import { WrapperView, Header } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createSettingsStyles } from '@/styles/settingsStyles';

type SettingsScreenProps = {};

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const styles = useThemedStyles(createSettingsStyles);
  
  const handleThemeChange = useCallback((isDark: boolean) => {
    console.log('Theme changed:', isDark ? 'dark' : 'light');
  }, []);
  
  const sections = useMemo(() => [
    { title: 'Appearance', icon: 'palette' },
    { title: 'Notifications', icon: 'bell' },
    { title: 'Privacy', icon: 'shield' },
    { title: 'About', icon: 'info' }
  ], []);
  
  return (
    <WrapperView>
      <Header title="Settings" />
      <ScrollView style={styles.container}>
        <SettingsSection 
          title="Theme" 
          icon="moon" 
          rightComponent={<ThemeToggle onChange={handleThemeChange} />} 
        />
        {sections.map((section) => (
          <SettingsSection 
            key={section.title}
            title={section.title}
            icon={section.icon}
            onPress={() => console.log(`Pressed ${section.title}`)}
          />
        ))}
      </ScrollView>
    </WrapperView>
  );
};
