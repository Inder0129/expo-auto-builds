import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export const ConceptDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  contentContainer: {
    paddingBottom: spacing.xxl
  },
  conceptHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg
  },
  descriptionPanel: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md
  },
  videoList: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.md
  }
});
