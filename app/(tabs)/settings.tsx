import React, { useCallback } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from '@/src/store/hooks';
import { setPrecision, clearAllData } from '@/src/store/slices/settings';
import { ThemeSwitcher } from '@/src/components/settings/theme-switcher';
import { DecimalPrecisionSelector } from '@/src/components/settings/decimal-precision-selector';
import { ClearDataButton } from '@/src/components/settings/clear-data-button';
import { WrapperView } from '@/src/components/ui';
import { createSettingsStyles } from '@/src/styles/settings';
import { useThemeColors } from '@/src/theme';

export default function SettingsScreen() {
  const colors = useThemeColors();
  const styles = createSettingsStyles(colors);
  const dispatch = useDispatch();
  const { precision } = useSelector((state) => state.settings);

  const handlePrecisionChange = useCallback((value: number) => {
    dispatch(setPrecision(value));
  }, [dispatch]);

  const handleClearData = useCallback(() => {
    dispatch(clearAllData());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <WrapperView>
        <View style={styles.section}>
          <ThemeSwitcher />
        </View>
        <View style={styles.section}>
          <DecimalPrecisionSelector value={precision} onChange={handlePrecisionChange} />
        </View>
        <View style={styles.section}>
          <ClearDataButton onPress={handleClearData} />
        </View>
      </WrapperView>
    </SafeAreaView>
  );
}
