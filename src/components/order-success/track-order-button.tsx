import React from 'react';
import { Button } from '@/src/components/ui';
import { spacing } from '@/src/theme';

interface Props {
  onPress: () => void;
}

export const TrackOrderButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Button
      title="Track Your Order"
      onPress={onPress}
      variant="outline"
      style={{ marginBottom: spacing.md, width: '100%' }}
    />
  );
};
