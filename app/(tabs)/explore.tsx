import React, { useCallback, useMemo, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SearchBar } from '@/src/components/explore/search-bar';
import { CategoryGrid } from '@/src/components/explore/category-grid';
import { ResourceList } from '@/src/components/explore/resource-list';
import { WrapperView } from '@/src/components/ui';
import { useAppSelector } from '@/src/store/hooks';
import { selectStudyResources } from '@/src/store/slices/study';
import styles from '@/src/styles/explore';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const studyResources = useAppSelector(selectStudyResources);
  
  const categories = useMemo(() => [
    { id: 'physics', title: 'Physics', icon: 'atom' },
    { id: 'chemistry', title: 'Chemistry', icon: 'flask' },
    { id: 'mathematics', title: 'Mathematics', icon: 'calculator' },
    { id: 'biology', title: 'Biology', icon: 'dna' },
    { id: 'english', title: 'English', icon: 'book-open' },
    { id: 'reasoning', title: 'Reasoning', icon: 'brain' }
  ], []);
  
  const filteredResources = useMemo(() => {
    return studyResources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [studyResources, searchQuery, selectedCategory]);
  
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
  
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
  }, []);
  
  const handleResourcePress = useCallback((resourceId: string) => {
    console.log('Open resource:', resourceId);
  }, []);
  
  return (
    <WrapperView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <SearchBar value={searchQuery} onChangeText={handleSearch} />
        <CategoryGrid 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />
        <ResourceList 
          resources={filteredResources} 
          onPress={handleResourcePress}
        />
      </ScrollView>
    </WrapperView>
  );
}
