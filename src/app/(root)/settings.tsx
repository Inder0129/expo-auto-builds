import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import SettingSwitch from '@/components/setting/setting-switch';
import SettingSlider from '@/components/setting/setting-slider';
import createSettingsStyles from '@/styles/settings';

const SettingsScreen = () => {
  const styles = useThemedStyles(createSettingsStyles);
  const handleSwitchChange = useCallback((value: boolean) => {
    console.log(value);
  }, []);
  const handleSliderChange = useCallback((value: number) => {
    console.log(value);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <SettingSwitch onValueChange={handleSwitchChange} />
      <SettingSlider onValueChange={handleSliderChange} />
    </View>
  );
};

export default SettingsScreen;