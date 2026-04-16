import React, { useState, useCallback } from 'react';
import { View, TextInput } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Icon } from '@/components/icons';
import createSearchBarStyles from './search-bar-styles';

type Props = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const styles = useThemedStyles(createSearchBarStyles);
  const [query, setQuery] = useState('');
  
  const handleSubmit = useCallback(() => {
    onSearch(query);
  }, [query, onSearch]);
  
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchBar;