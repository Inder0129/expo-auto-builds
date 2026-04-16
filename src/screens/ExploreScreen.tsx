import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { ContentGrid, SearchBar } from '@/components/explore';
import { WrapperView } from '@/components/ui';
import createExploreStyles from '@/styles/exploreStyles';

type Props = {};

const ExploreScreen: React.FC<Props> = () => {
  const styles = useThemedStyles(createExploreStyles);
  
  const handleSearch = useCallback((query: string) => {
    console.log('Search query:', query);
  }, []);
  
  const handleItemPress = useCallback((itemId: string) => {
    console.log('Item pressed:', itemId);
  }, []);
  
  const contentItems = useMemo(() => [
    { id: '1', title: 'Feature 1', description: 'Description 1' },
    { id: '2', title: 'Feature 2', description: 'Description 2' },
    { id: '3', title: 'Feature 3', description: 'Description 3' },
    { id: '4', title: 'Feature 4', description: 'Description 4' },
  ], []);
  
  return (
    <WrapperView>
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <ContentGrid items={contentItems} onItemPress={handleItemPress} />
      </View>
    </WrapperView>
  );
};

export default ExploreScreen;