import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectNumberFormat, setNumberFormat } from '@/store/slices/settings';
import { Button } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createNumberFormatSelectorStyles } from '@/styles/components/number-format-selector';

export const NumberFormatSelector: React.FC = () => {
  const currentFormat = useAppSelector(selectNumberFormat);
  const dispatch = useAppDispatch();
  const styles = useThemedStyles(createNumberFormatSelectorStyles);

  const formats = ['decimal', 'scientific', 'engineering'];

  const handleFormatSelect = useCallback((format: string) => {
    dispatch(setNumberFormat(format));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Number Format</Text>
      <View style={styles.formatsContainer}>
        {formats.map((format) => (
          <Button
            key={format}
            title={format.charAt(0).toUpperCase() + format.slice(1)}
            onPress={() => handleFormatSelect(format)}
            style={[
              styles.formatButton,
              currentFormat === format && styles.formatButtonActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};
