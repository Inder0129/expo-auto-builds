import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/src/theme/colors';

export const createHistoryStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'flex-end',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
