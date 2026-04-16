import React, { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSearchQuery } from '@/store/slices/history';
import { Input } from '@/components/ui';
import { SearchIcon } from '@/components/icons';

export const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleChange = useCallback((query: string) => {
    dispatch(setSearchQuery(query));
  }, [dispatch]);

  return (
    <Input
      placeholder="Search history"
      onChangeText={handleChange}
      leftIcon={<SearchIcon />}
    />
  );
};
