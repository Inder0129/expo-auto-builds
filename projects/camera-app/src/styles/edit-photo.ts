import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary
  },
  scrollContent: {
    paddingBottom: spacing.xl
  },
  controlsContainer: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    gap: spacing.md
  },
  resetButton: {
    flex: 1
  },
  saveButton: {
    flex: 1
  }
});
