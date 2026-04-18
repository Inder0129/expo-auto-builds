import React from 'react';
import { Button } from '@/src/components/ui';

interface Props {
  onPress: () => void;
}

export const AddAddressButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Button
      title="Add New Address"
      onPress={onPress}
      variant="outline"
      style={{ width: '100%' }}
    />
  );
};
