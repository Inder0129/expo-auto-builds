import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookmarkList } from '@/src/components/bookmark/bookmark-list';
import { ConceptCard } from '@/src/components/concept/concept-card';
import { colors, spacing, typography } from '@/src/theme';
import { bookmarksStyles } from '@/src/styles/bookmarks';

type Bookmark = {
  id: string;
  type: 'video' | 'concept';
  title: string;
  description: string;
  timestamp?: string;
  conceptId?: string;
  videoId?: string;
};

type Concept = {
  id: string;
  title: string;
  description: string;
  category: string;
  videoCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

export default function BookmarksScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'videos' | 'concepts'>('all');

  const bookmarks: Bookmark[] = useMemo(() => [
    {
      id: 'b1',
      type: 'video',
      title: 'Introduction to Calculus',
      description: 'Learn the basics of derivatives and integrals',
      timestamp: '2 days ago',
      videoId: 'v1',
    },
    {
      id: 'b2',
      type: 'concept',
      title: 'Linear Algebra',
      description: 'Vector spaces and linear transformations',
      conceptId: 'c1',
    },
    {
      id: 'b3',
      type: 'video',
      title: 'Probability Basics',
      description: 'Understanding chance and randomness',
      timestamp: '1 week ago',
      videoId: 'v2',
    },
    {
      id: 'b4',
      type: 'concept',
      title: 'Trigonometry',
      description: 'Study of triangles and angles',
      conceptId: 'c2',
    },
  ], []);

  const concepts: Concept[] = useMemo(() => [
    {
      id: 'c1',
      title: 'Linear Algebra',
      description: 'Vector spaces and linear transformations',
      category: 'Algebra',
      videoCount: 32,
      difficulty: 'intermediate',
    },
    {
      id: 'c2',
      title: 'Trigonometry',
      description: 'Study of triangles and angles',
      category: 'Foundations',
      videoCount: 18,
      difficulty: 'beginner',
    },
  ], []);

  const filteredBookmarks = useMemo(() => {
    if (activeTab === 'all') return bookmarks;
    return bookmarks.filter((bookmark: Bookmark) => bookmark.type === activeTab.slice(0, -1));
  }, [bookmarks, activeTab]);

  const bookmarkedConcepts = useMemo(() => {
    const conceptIds = bookmarks
      .filter((bookmark: Bookmark) => bookmark.type === 'concept' && bookmark.conceptId)
      .map((bookmark: Bookmark) => bookmark.conceptId);
    return concepts.filter((concept: Concept) => conceptIds.includes(concept.id));
  }, [bookmarks, concepts]);

  const handleTabChange = useCallback((tab: 'all' | 'videos' | 'concepts') => {
    setActiveTab(tab);
  }, []);

  const handleBookmarkPress = useCallback((bookmarkId: string) => {
    console.log('Bookmark pressed:', bookmarkId);
  }, []);

  const handleBookmarkRemove = useCallback((bookmarkId: string) => {
    console.log('Remove bookmark:', bookmarkId);
  }, []);

  const handleConceptPress = useCallback((conceptId: string) => {
    console.log('Concept pressed:', conceptId);
  }, []);

  return (
    <SafeAreaView style={bookmarksStyles.container} edges={['top']}>
      <View style={bookmarksStyles.header}>
        <Text style={bookmarksStyles.title}>My Bookmarks</Text>
        <Text style={bookmarksStyles.subtitle}>Saved videos and concepts</Text>
      </View>

      <View style={bookmarksStyles.tabs}>
        {(['all', 'videos', 'concepts'] as const).map((tab: 'all' | 'videos' | 'concepts') => (
          <Text
            key={tab}
            style={[
              bookmarksStyles.tab,
              activeTab === tab && bookmarksStyles.activeTab,
            ]}
            onPress={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        ))}
      </View>

      {activeTab === 'concepts' ? (
        <FlatList
          data={bookmarkedConcepts}
          keyExtractor={(item: Concept) => item.id}
          renderItem={({ item }: { item: Concept }) => (
            <ConceptCard
              concept={item}
              onPress={handleConceptPress}
              style={bookmarksStyles.conceptCard}
            />
          )}
          contentContainerStyle={bookmarksStyles.conceptsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <BookmarkList
          bookmarks={filteredBookmarks}
          onBookmarkPress={handleBookmarkPress}
          onRemoveBookmark={handleBookmarkRemove}
        />
      )}

      {filteredBookmarks.length === 0 && (
        <View style={bookmarksStyles.emptyState}>
          <Text style={bookmarksStyles.emptyStateText}>
            No bookmarks yet. Start saving your favorite content!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}