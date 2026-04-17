import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  mapContainer: {
    height: 200,
    margin: spacing.md,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  addressList: {
    padding: spacing.md,
  },
  addressItem: {
    backgroundColor: colors.surface,
    borderRadius: 8,
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
    marginBottom: spacing.sm,
  },
  addressName: {
    ...typography.h4,
    color: colors.text.primary,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  defaultText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold' as const,
  },
  addressText: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  addressActions: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  addButtonContainer: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  addButton: {
    width: '100%',
  },
});