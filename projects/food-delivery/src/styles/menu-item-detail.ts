import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: spacing.xxl,
  },
  itemDetail: {
    marginBottom: spacing.lg,
  },
  customizationSection: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  customizationOption: {
    marginBottom: spacing.md,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  quantitySelector: {
    flex: 1,
    marginRight: spacing.md,
  },
  addToCartButton: {
    flex: 2,
  },
});