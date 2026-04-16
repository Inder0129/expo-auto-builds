import { ThemeColors } from '@/theme/colors';
import { moderateScaleFactor, spacing } from '@/theme/spacing';

const createHistoryStyles = (colors: ThemeColors) => {
  return {
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing[4],
    },
  };
};

export default createHistoryStyles;