import { ThemeColors } from '@/theme/colors';

const createHistoryStyles = (colors: ThemeColors) => {
  return {
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  };
};

export { createHistoryStyles };