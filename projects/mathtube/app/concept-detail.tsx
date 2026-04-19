import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ConceptHeader } from '@/src/components/concept-detail/concept-header';
import { VideoList } from '@/src/components/concept-detail/video-list';
import { DescriptionPanel } from '@/src/components/concept-detail/description-panel';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { ConceptDetailStyles } from '@/src/styles/concept-detail';

type ConceptDetailParams = {
  conceptId: string;
};

type ConceptData = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  prerequisites: string[];
  applications: string[];
};

type VideoData = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  uploadDate: string;
};

export default function ConceptDetailScreen() {
  const params = useLocalSearchParams<ConceptDetailParams>();
  const router = useRouter();

  const conceptData: ConceptData = useMemo(() => ({
    id: params.conceptId || 'default-concept-id',
    title: 'Linear Algebra',
    description: 'Linear algebra is the branch of mathematics concerning linear equations, linear maps, and their representations in vector spaces and through matrices.',
    difficulty: 'intermediate',
    category: 'Algebra',
    prerequisites: ['Basic Algebra', 'Geometry'],
    applications: ['Computer Graphics', 'Machine Learning', 'Engineering']
  }), [params.conceptId]);

  const videos: VideoData[] = useMemo(() => ([
    { id: '1', title: 'Vectors and Spaces', description: 'Introduction to vectors and vector spaces', thumbnailUrl: 'https://example.com/thumb1.jpg', duration: 1200, views: 15000, uploadDate: '2024-01-10' },
    { id: '2', title: 'Matrix Operations', description: 'Learn matrix addition, multiplication, and properties', thumbnailUrl: 'https://example.com/thumb2.jpg', duration: 1800, views: 22000, uploadDate: '2024-01-15' },
    { id: '3', title: 'Eigenvalues and Eigenvectors', description: 'Understanding eigenvalues and eigenvectors', thumbnailUrl: 'https://example.com/thumb3.jpg', duration: 2100, views: 18000, uploadDate: '2024-01-20' }
  ]), []);

  const handleVideoSelect = useCallback((videoId: string) => {
    router.push({ pathname: '/video-detail', params: { videoId, conceptId: conceptData.id } });
  }, [router, conceptData.id]);

  const handleRelatedConceptSelect = useCallback((conceptId: string) => {
    router.push({ pathname: '/concept-detail', params: { conceptId } });
  }, [router]);

  return (
    <ScrollView style={ConceptDetailStyles.container} contentContainerStyle={ConceptDetailStyles.contentContainer}>
      <ConceptHeader 
        concept={conceptData}
        onRelatedConceptSelect={handleRelatedConceptSelect}
        style={ConceptDetailStyles.conceptHeader}
      />
      <DescriptionPanel 
        description={conceptData.description}
        applications={conceptData.applications}
        style={ConceptDetailStyles.descriptionPanel}
      />
      <VideoList 
        videos={videos}
        onVideoSelect={handleVideoSelect}
        style={ConceptDetailStyles.videoList}
      />
    </ScrollView>
  );
}
