import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    ...typography.h2,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  cuisine: {
    ...typography.body,
    color: colors.onSurface,
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...typography.body,
    color: colors.onSurface,
    marginLeft: spacing.xs,
    marginRight: spacing.xs,
  },
  ratingCount: {
    ...typography.bodySmall,
    color: colors.onSurface,
    opacity: 0.8,
  },
  favoriteButton: {
    padding: spacing.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  detailText: {
    ...typography.bodySmall,
    color: colors.onSurface,
    marginLeft: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.onSurface,
    opacity: 0.9,
  },
});
