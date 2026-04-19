import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export const VideoDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  contentContainer: {
    paddingBottom: spacing.xxl
  },
  videoPlayer: {
    width: '100%',
    height: 240,
    backgroundColor: colors.surface
  },
  conceptDetail: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md
  },
  relatedVideos: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.md
  }
});
