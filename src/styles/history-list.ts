import { ThemeColors } from '@/theme/colors';
import { moderateScaleFactor, spacing } from '@/theme/spacing';
import { fontSize, fontFamily } from '@/theme/typography';

const createHistoryListStyles = (colors: ThemeColors) => {
  return {
    container: {
      flex: 1,
    },
    item: {
      fontSize: fontSize.body,
      fontFamily: fontFamily.body,
      marginBottom: spacing[2],
    },
  };
};

export default createHistoryListStyles;