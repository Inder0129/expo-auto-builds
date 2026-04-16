import React from 'react';
import { ViewStyle } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Button } from '@/components/ui';
import { useAppDispatch } from '@/store/hooks';
import { historyActions } from '@/store/slices/history';
import { createClearHistoryButtonStyles } from './clear-history-button.styles';

type ClearHistoryButtonProps = {
  onPress?: () => void;
  style?: ViewStyle;
};

export function ClearHistoryButton({ onPress, style }: ClearHistoryButtonProps) {
  const styles = useThemedStyles(createClearHistoryButtonStyles);
  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    dispatch(historyActions.clear());
    onPress?.();
  }, [dispatch, onPress]);

  return (
    <Button
      title="Clear History"
      onPress={handlePress}
      style={[styles.button, style]}
      textStyle={styles.buttonText}
    />
  );
}
