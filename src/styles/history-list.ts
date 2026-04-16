import { ThemeColors } from '@/theme/colors';

const createHistoryListStyles = (colors: ThemeColors) => {
  return {
    container: {
      padding: 16,
    },
    item: {
      fontSize: 16,
      marginBottom: moderateScaleFactor(8),
    },
  };
};

export { createHistoryListStyles };