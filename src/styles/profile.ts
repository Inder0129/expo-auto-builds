import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  addressesScroll: {
    marginHorizontal: -spacing.md,
    paddingHorizontal: spacing.md,
  },
  manageButton: {
    marginTop: spacing.md,
  },
  menuCard: {
    padding: 0,
    overflow: 'hidden',
  },
});
