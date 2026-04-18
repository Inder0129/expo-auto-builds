import React, { useState, useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { SettingsItem } from '@/src/components/settings/settings-item';
import { ToggleSwitch } from '@/src/components/settings/toggle-switch';
import { LanguageSelector } from '@/src/components/settings/language-selector';
import { AboutSection } from '@/src/components/settings/about-section';
import { styles } from '@/src/styles/settings';

type SettingsSection = {
  id: string;
  title: string;
  items: SettingsItemType[];
};

type SettingsItemType = {
  id: string;
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: 'toggle' | 'link' | 'selector';
  value?: boolean;
  onPress?: () => void;
};

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('English');

  const handleToggleNotifications = useCallback((value: boolean) => {
    setNotificationsEnabled(value);
  }, []);

  const handleToggleDarkMode = useCallback((value: boolean) => {
    setDarkModeEnabled(value);
  }, []);

  const handleSelectLanguage = useCallback((selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  }, []);

  const handleNavigateToPrivacy = useCallback(() => {
    router.push('/privacy');
  }, [router]);

  const handleNavigateToTerms = useCallback(() => {
    router.push('/terms');
  }, [router]);

  const handleNavigateToHelp = useCallback(() => {
    router.push('/help');
  }, [router]);

  const sections: SettingsSection[] = [
    {
      id: 'preferences',
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Receive order updates and offers',
          icon: 'notifications-outline',
          type: 'toggle',
          value: notificationsEnabled,
          onPress: () => handleToggleNotifications(!notificationsEnabled)
        },
        {
          id: 'dark-mode',
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          icon: 'moon-outline',
          type: 'toggle',
          value: darkModeEnabled,
          onPress: () => handleToggleDarkMode(!darkModeEnabled)
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'App language',
          icon: 'language-outline',
          type: 'selector',
          value: undefined
        }
      ]
    },
    {
      id: 'legal',
      title: 'Legal',
      items: [
        {
          id: 'privacy',
          title: 'Privacy Policy',
          icon: 'shield-checkmark-outline',
          type: 'link',
          onPress: handleNavigateToPrivacy
        },
        {
          id: 'terms',
          title: 'Terms of Service',
          icon: 'document-text-outline',
          type: 'link',
          onPress: handleNavigateToTerms
        }
      ]
    },
    {
      id: 'support',
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          icon: 'help-circle-outline',
          type: 'link',
          onPress: handleNavigateToHelp
        },
        {
          id: 'contact',
          title: 'Contact Us',
          icon: 'mail-outline',
          type: 'link',
          onPress: () => {}
        }
      ]
    }
  ];

  const renderItem = useCallback((item: SettingsItemType) => {
    switch (item.type) {
      case 'toggle':
        return (
          <SettingsItem
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            onPress={item.onPress}
            rightElement={
              <ToggleSwitch
                value={item.value || false}
                onValueChange={item.onPress}
              />
            }
          />
        );
      case 'selector':
        return (
          <SettingsItem
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            onPress={() => {}}
            rightElement={
              <LanguageSelector
                currentLanguage={language}
                onSelectLanguage={handleSelectLanguage}
              />
            }
          />
        );
      case 'link':
        return (
          <SettingsItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            onPress={item.onPress}
            rightElement={
              <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
            }
          />
        );
      default:
        return null;
    }
  }, [language, handleSelectLanguage]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your app experience</Text>
      </View>

      {sections.map((section: SettingsSection) => (
        <View key={section.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item: SettingsItemType) => renderItem(item))}
          </View>
        </View>
      ))}

      <AboutSection
        appName="FoodDelivery"
        version="1.0.0"
        onPressAbout={() => {}}
        onPressRate={() => {}}
        onPressShare={() => {}}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
        <Ionicons name="log-out-outline" size={20} color={colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
