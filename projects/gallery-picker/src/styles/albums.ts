import { StyleSheet } from 'react-native';
import { spacing } from '../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  grid: {
    padding: spacing.sm,
  },
  gridItem: {
    margin: spacing.sm,
  },
});
