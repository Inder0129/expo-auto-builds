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
    margin: spacing.xs,
  },
  selectionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
});
