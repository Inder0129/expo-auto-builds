import { ThemeColors } from '@/theme';

const createCalcStyles = (colors: ThemeColors) => {
  return {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  };
};

export { createCalcStyles };