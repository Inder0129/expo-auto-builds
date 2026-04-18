import React from 'react';
import { Button } from '@/src/components/ui';

interface Props {
  onPress: () => void;
}

export const ContinueShopping: React.FC<Props> = ({ onPress }) => {
  return (
    <Button
      title="Continue Shopping"
      onPress={onPress}
      style={{ width: '100%' }}
    />
  );
};
