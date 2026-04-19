import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryGrid } from '@/src/components/category/category-grid';
import { ConceptCard } from '@/src/components/concept/concept-card';
import { colors, spacing, typography } from '@/src/theme';
import { exploreStyles } from '@/src/styles/explore';

type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

type Concept = {
  id: string;
  title: string;
  description: string;
  category: string;
  videoCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = useMemo(() => [
    { id: '1', name: 'Foundations', icon: 'calculator', color: colors.primary },
    { id: '2', name: 'Algebra', icon: 'function', color: colors.secondary },
    { id: '3', name: 'Geometry', icon: 'shapes', color: colors.accent },
    { id: '4', name: 'Calculus', icon: 'graph', color: colors.success },
    { id: '5', name: 'Statistics', icon: 'stats-chart', color: colors.warning },
    { id: '6', name: 'Applied Math', icon: 'rocket', color: colors.info },
  ], []);

  const concepts: Concept[] = useMemo(() => [
    {
      id: '1',
      title: 'Linear Algebra',
      description: 'Vector spaces and linear mappings',
      category: 'Algebra',
      videoCount: 32,
      difficulty: 'intermediate',
    },
    {
      id: '2',
      title: 'Trigonometry',
      description: 'Study of triangles and angles',
      category: 'Foundations',
      videoCount: 18,
      difficulty: 'beginner',
    },
    {
      id: '3',
      title: 'Differential Equations',
      description: 'Equations involving derivatives',
      category: 'Calculus',
      videoCount: 25,
      difficulty: 'advanced',
    },
    {
      id: '4',
      title: 'Probability Theory',
      description: 'Mathematical study of randomness',
      category: 'Statistics',
      videoCount: 20,
      difficulty: 'intermediate',
    },
    {
      id: '5',
      title: 'Number Theory',
      description: 'Properties of integers',
      category: 'Foundations',
      videoCount: 15,
      difficulty: 'advanced',
    },
    {
      id: '6',
      title: 'Topology',
      description: 'Study of geometric properties',
      category: 'Geometry',
      videoCount: 12,
      difficulty: 'advanced',
    },
  ], []);

  const filteredConcepts = useMemo(() => {
    if (!selectedCategory) return concepts;
    return concepts.filter((concept: Concept) => concept.category === selectedCategory);
  }, [concepts, selectedCategory]);

  const handleCategoryPress = useCallback((categoryId: string) => {
    const category = categories.find((cat: Category) => cat.id === categoryId);
    if (category) {
      setSelectedCategory(selectedCategory === category.name ? null : category.name);
    }
  }, [categories, selectedCategory]);

  const handleConceptPress = useCallback((conceptId: string) => {
    console.log('Concept pressed:', conceptId);
  }, []);

  return (
    <SafeAreaView style={exploreStyles.container} edges={['top']}>
      <View style={exploreStyles.header}>
        <Text style={exploreStyles.title}>Explore Mathematics</Text>
        <Text style={exploreStyles.subtitle}>Browse by category</Text>
      </View>

      <CategoryGrid
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryPress={handleCategoryPress}
      />

      <View style={exploreStyles.conceptsHeader}>
        <Text style={exploreStyles.conceptsTitle}>
          {selectedCategory ? `${selectedCategory} Concepts` : 'All Concepts'}
        </Text>
        <Text style={exploreStyles.conceptsCount}>
          {filteredConcepts.length} concepts
        </Text>
      </View>

      <FlatList
        data={filteredConcepts}
        keyExtractor={(item: Concept) => item.id}
        renderItem={({ item }: { item: Concept }) => (
          <ConceptCard
            concept={item}
            onPress={handleConceptPress}
            style={exploreStyles.conceptCard}
          />
        )}
        contentContainerStyle={exploreStyles.conceptsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}