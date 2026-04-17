import React from 'react';
import { Button } from '@/src/components/ui/button';
import { Icon } from '@/src/components/icons';

type ClearHistoryButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

export const ClearHistoryButton: React.FC<ClearHistoryButtonProps> = ({ onPress, disabled }) => {
  return (
    <Button
      variant="danger"
      size="small"
      onPress={onPress}
      disabled={disabled}
      icon={<Icon name="trash" size={16} />}
    >
      Clear History
    </Button>
  );
};
