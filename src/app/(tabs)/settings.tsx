import React from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { ThemeSelector, SettingsList } from '@/components/settings';
import { WrapperView } from '@/components/ui';
import { createSettingsStyles } from '@/styles/tabs/settings';

export default function SettingsScreen() {
  const styles = useThemedStyles(createSettingsStyles);

  return (
    <WrapperView style={styles.wrapper}>
      <View style={styles.container}>
        <ThemeSelector style={styles.themeSelector} />
        <SettingsList style={styles.settingsList} />
      </View>
    </WrapperView>
  );
}
