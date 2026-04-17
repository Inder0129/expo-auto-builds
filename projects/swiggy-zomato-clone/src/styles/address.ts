import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  mapContainer: {
    height: 200,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: spacing.md,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  addressList: {
    paddingHorizontal: spacing.lg,
  },
  addressItem: {
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedAddress: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  addressName: {
    ...typography.subtitle,
    color: colors.text.primary,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
  },
  defaultText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  addressText: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  actionButton: {
    paddingHorizontal: spacing.md,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    left: spacing.lg,
  },
  addButton: {
    borderRadius: spacing.round,
  },
});
