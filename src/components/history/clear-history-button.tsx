import React, { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { clearHistory } from '@/store/slices/history';
import { Button } from '@/components/ui';
import { TrashIcon } from '@/components/icons';

export const ClearHistoryButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClear = useCallback(() => {
    dispatch(clearHistory());
  }, [dispatch]);

  return (
    <Button
      title="Clear History"
      onPress={handleClear}
      leftIcon={<TrashIcon />}
    />
  );
};
