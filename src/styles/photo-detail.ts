import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing } from '@/src/theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary
  },
  scrollContent: {
    paddingBottom: spacing.xl
  },
  infoContainer: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.md
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm
  },
  infoText: {
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.text.secondary
  }
});
