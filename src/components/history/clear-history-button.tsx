import React from 'react';
import { Button } from '@/components/ui';

type ClearHistoryButtonProps = {
  onPress: () => void;
};

export const ClearHistoryButton: React.FC<ClearHistoryButtonProps> = ({ onPress }) => {
  return (
    <Button
      title="Clear History"
      onPress={onPress}
    />
  );
};
