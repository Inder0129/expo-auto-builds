import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  style?: ViewStyle;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.videoPlaceholder}>
        <Ionicons name="play-circle" size={64} color={colors.primary} />
        <Text style={styles.placeholderText}>Video Player</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>15:00 • 15K views • 2 weeks ago</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.surface
  },
  videoPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  placeholderText: {
    marginTop: spacing.sm,
    color: colors.onSurfaceVariant,
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily
  },
  infoContainer: {
    padding: spacing.md
  },
  title: {
    fontSize: typography.titleMedium.fontSize,
    fontFamily: typography.titleMedium.fontFamily,
    color: colors.onSurface,
    marginBottom: spacing.xs
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  metaText: {
    fontSize: typography.bodySmall.fontSize,
    fontFamily: typography.bodySmall.fontFamily,
    color: colors.onSurfaceVariant
  }
});
