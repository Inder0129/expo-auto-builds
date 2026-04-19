import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface RelatedVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
}

interface RelatedVideosProps {
  videos: RelatedVideo[];
  onVideoSelect?: (videoId: string) => void;
  style?: ViewStyle;
}

export const RelatedVideos: React.FC<RelatedVideosProps> = ({ videos, onVideoSelect, style }) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Related Videos</Text>
      {videos.map((video: RelatedVideo) => (
        <TouchableOpacity 
          key={video.id} 
          style={styles.videoItem}
          onPress={() => onVideoSelect?.(video.id)}
        >
          <View style={styles.thumbnailContainer}>
            <View style={styles.thumbnailPlaceholder}>
              <Ionicons name="play-circle" size={32} color={colors.primary} />
            </View>
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{formatDuration(video.duration)}</Text>
            </View>
          </View>
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
            <Text style={styles.videoMeta}>{formatViews(video.views)} views</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  title: {
    fontSize: typography.titleSmall.fontSize,
    fontFamily: typography.titleSmall.fontFamily,
    color: colors.onSurface,
    marginBottom: spacing.md
  },
  videoItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
    overflow: 'hidden'
  },
  thumbnailContainer: {
    position: 'relative',
    width: 120,
    height: 80
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center'
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4
  },
  durationText: {
    fontSize: typography.labelSmall.fontSize,
    fontFamily: typography.labelSmall.fontFamily,
    color: colors.onPrimary
  },
  videoInfo: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'center'
  },
  videoTitle: {
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.onSurface,
    marginBottom: spacing.xs
  },
  videoMeta: {
    fontSize: typography.bodySmall.fontSize,
    fontFamily: typography.bodySmall.fontFamily,
    color: colors.onSurfaceVariant
  }
});
