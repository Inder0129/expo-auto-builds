import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { VideoPlayer } from '@/src/components/video-detail/video-player';
import { ConceptDetail } from '@/src/components/video-detail/concept-detail';
import { RelatedVideos } from '@/src/components/video-detail/related-videos';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { VideoDetailStyles } from '@/src/styles/video-detail';

type VideoDetailParams = {
  videoId: string;
  conceptId: string;
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

type ConceptData = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relatedConcepts: string[];
};

type RelatedVideoData = {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
};

export default function VideoDetailScreen() {
  const params = useLocalSearchParams<VideoDetailParams>();
  const router = useRouter();

  const videoData: VideoData = useMemo(() => ({
    id: params.videoId || 'default-id',
    title: 'Introduction to Calculus',
    description: 'Learn the fundamentals of calculus including limits, derivatives, and integrals.',
    thumbnailUrl: 'https://example.com/thumbnail.jpg',
    duration: 1200,
    views: 15000,
    uploadDate: '2024-01-15'
  }), [params.videoId]);

  const conceptData: ConceptData = useMemo(() => ({
    id: params.conceptId || 'default-concept-id',
    title: 'Calculus',
    description: 'Calculus is the mathematical study of continuous change.',
    difficulty: 'intermediate',
    relatedConcepts: ['Algebra', 'Trigonometry', 'Differential Equations']
  }), [params.conceptId]);

  const relatedVideos: RelatedVideoData[] = useMemo(() => ([
    { id: '1', title: 'Limits and Continuity', thumbnailUrl: 'https://example.com/thumb1.jpg', duration: 900, views: 8000 },
    { id: '2', title: 'Derivatives Explained', thumbnailUrl: 'https://example.com/thumb2.jpg', duration: 1100, views: 12000 },
    { id: '3', title: 'Integration Basics', thumbnailUrl: 'https://example.com/thumb3.jpg', duration: 1400, views: 9500 }
  ]), []);

  const handleVideoSelect = useCallback((videoId: string) => {
    router.push({ pathname: '/video-detail', params: { videoId, conceptId: conceptData.id } });
  }, [router, conceptData.id]);

  const handleConceptSelect = useCallback((conceptId: string) => {
    router.push({ pathname: '/concept-detail', params: { conceptId } });
  }, [router]);

  return (
    <ScrollView style={VideoDetailStyles.container} contentContainerStyle={VideoDetailStyles.contentContainer}>
      <VideoPlayer 
        videoUrl={`https://example.com/videos/${videoData.id}`}
        title={videoData.title}
        style={VideoDetailStyles.videoPlayer}
      />
      <ConceptDetail 
        concept={conceptData}
        onConceptSelect={handleConceptSelect}
        style={VideoDetailStyles.conceptDetail}
      />
      <RelatedVideos 
        videos={relatedVideos}
        onVideoSelect={handleVideoSelect}
        style={VideoDetailStyles.relatedVideos}
      />
    </ScrollView>
  );
}
