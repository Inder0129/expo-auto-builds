import React from 'react';
import { useThemedStyles } from '@/theme';
import { Button } from '@/components/ui';
import { TrashIcon } from '@/components/icons';
import { createClearHistoryButtonStyles } from './clear-history-button.styles';

type ClearHistoryButtonProps = {
  onPress: () => void;
  disabled: boolean;
};

export const ClearHistoryButton: React.FC<ClearHistoryButtonProps> = ({ onPress, disabled }) => {
  const styles = useThemedStyles(createClearHistoryButtonStyles);

  return (
    <Button
      title="Clear All"
      type="secondary"
      onPress={onPress}
      disabled={disabled}
      icon={<TrashIcon size={20} />}
      style={styles.button}
    />
  );
};
