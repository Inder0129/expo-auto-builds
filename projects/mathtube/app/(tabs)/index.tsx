import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@/src/components/search/search-bar';
import { ConceptList } from '@/src/components/concept/concept-list';
import { VideoPlayer } from '@/src/components/video/video-player';
import { colors, spacing, typography } from '@/src/theme';
import { homeStyles } from '@/src/styles/home';

type Concept = {
  id: string;
  title: string;
  description: string;
  category: string;
  videoCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

type Video = {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnailUrl: string;
  conceptId: string;
};

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const concepts: Concept[] = useMemo(() => [
    {
      id: '1',
      title: 'Calculus',
      description: 'Study of continuous change',
      category: 'Advanced Mathematics',
      videoCount: 24,
      difficulty: 'advanced',
    },
    {
      id: '2',
      title: 'Algebra',
      description: 'Mathematical symbols and rules',
      category: 'Foundations',
      videoCount: 18,
      difficulty: 'beginner',
    },
    {
      id: '3',
      title: 'Geometry',
      description: 'Properties and relations of points, lines, surfaces',
      category: 'Foundations',
      videoCount: 15,
      difficulty: 'intermediate',
    },
    {
      id: '4',
      title: 'Statistics',
      description: 'Collection, analysis, interpretation of data',
      category: 'Applied Mathematics',
      videoCount: 12,
      difficulty: 'intermediate',
    },
  ], []);

  const videos: Video[] = useMemo(() => [
    {
      id: 'v1',
      title: 'Introduction to Derivatives',
      channel: 'Math Professor',
      duration: '12:45',
      thumbnailUrl: 'https://example.com/thumb1.jpg',
      conceptId: '1',
    },
    {
      id: 'v2',
      title: 'Solving Linear Equations',
      channel: 'Algebra Master',
      duration: '8:30',
      thumbnailUrl: 'https://example.com/thumb2.jpg',
      conceptId: '2',
    },
  ], []);

  const filteredConcepts = useMemo(() => {
    if (!searchQuery.trim()) return concepts;
    return concepts.filter((concept: Concept) =>
      concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [concepts, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleConceptPress = useCallback((conceptId: string) => {
    console.log('Concept pressed:', conceptId);
  }, []);

  const handleVideoSelect = useCallback((video: Video) => {
    setSelectedVideo(video);
  }, []);

  const handleVideoClose = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  return (
    <SafeAreaView style={homeStyles.container} edges={['top']}>
      <View style={homeStyles.header}>
        <Text style={homeStyles.title}>MathTube</Text>
        <Text style={homeStyles.subtitle}>Learn Mathematics Through Videos</Text>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search concepts..."
        style={homeStyles.searchBar}
      />

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={handleVideoClose}
          style={homeStyles.videoPlayer}
        />
      )}

      <ConceptList
        concepts={filteredConcepts}
        onConceptPress={handleConceptPress}
        onVideoSelect={handleVideoSelect}
        videos={videos}
      />
    </SafeAreaView>
  );
}