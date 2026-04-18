import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export const ordersStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  currentOrderContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  trackingStepper: {
    marginTop: spacing.md,
  },
  pastOrderList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  pastOrderCard: {
    marginBottom: spacing.md,
  },
});
