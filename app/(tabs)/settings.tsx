import React, { useCallback } from 'react';
import { View, ScrollView, Switch } from 'react-native';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { updateSettings } from '@/src/store/slices/settings';
import { SettingsList } from '@/src/components/settings/settings-list';
import { AboutSection } from '@/src/components/settings/about-section';
import { AppSettings } from '@/src/types';
import { colors } from '@/src/theme';
import styles from '@/src/styles/settings';

interface SettingsScreenProps {}

export default function SettingsScreen(props: SettingsScreenProps) {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: any) => state.settings);

  const handleToggleSetting = useCallback((key: keyof AppSettings, value: boolean) => {
    dispatch(updateSettings({ [key]: value }));
  }, [dispatch]);

  const settingsItems = [
    {
      id: 'saveToGallery',
      title: 'Save to Gallery',
      description: 'Automatically save photos to device gallery',
      value: settings.saveToGallery,
      onValueChange: (value: boolean) => handleToggleSetting('saveToGallery', value)
    },
    {
      id: 'highQuality',
      title: 'High Quality',
      description: 'Capture photos in highest quality (uses more storage)',
      value: settings.highQuality,
      onValueChange: (value: boolean) => handleToggleSetting('highQuality', value)
    },
    {
      id: 'locationTagging',
      title: 'Location Tagging',
      description: 'Add location data to photos',
      value: settings.locationTagging,
      onValueChange: (value: boolean) => handleToggleSetting('locationTagging', value)
    },
    {
      id: 'soundEffects',
      title: 'Sound Effects',
      description: 'Play sounds when capturing photos',
      value: settings.soundEffects,
      onValueChange: (value: boolean) => handleToggleSetting('soundEffects', value)
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <SettingsList items={settingsItems} />
      <AboutSection />
    </ScrollView>
  );
}
