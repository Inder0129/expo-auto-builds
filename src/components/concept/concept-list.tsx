import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { ConceptCard } from './concept-card';

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

export interface ConceptListProps {
  concepts: Concept[];
  videos: Video[];
  onConceptPress: (conceptId: string) => void;
  onVideoSelect: (video: Video) => void;
  style?: ViewStyle;
}

export const ConceptList: React.FC<ConceptListProps> = (props: ConceptListProps) => {
  const getConceptVideos = useCallback((conceptId: string): Video[] => {
    return props.videos.filter((video: Video) => video.conceptId === conceptId);
  }, [props.videos]);

  const renderConceptItem = useCallback(({ item }: { item: Concept }) => {
    const conceptVideos = getConceptVideos(item.id);
    return (
      <ConceptCard
        concept={item}
        videos={conceptVideos}
        onPress={props.onConceptPress}
        onVideoSelect={props.onVideoSelect}
        style={styles.conceptCard}
      />
    );
  }, [getConceptVideos, props.onConceptPress, props.onVideoSelect]);

  return (
    <FlatList
      data={props.concepts}
      keyExtractor={(item: Concept) => item.id}
      renderItem={renderConceptItem}
      contentContainerStyle={[styles.container, props.style]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  conceptCard: {
    marginBottom: spacing.lg,
  },
});