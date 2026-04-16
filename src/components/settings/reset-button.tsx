import React, { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { resetSettings } from '@/store/slices/settings';
import { Button } from '@/components/ui';
import { ResetIcon } from '@/components/icons';

export const ResetButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleReset = useCallback(() => {
    dispatch(resetSettings());
  }, [dispatch]);

  return (
    <Button
      title="Reset to Defaults"
      onPress={handleReset}
      leftIcon={<ResetIcon />}
    />
  );
};
