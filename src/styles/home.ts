import { ThemeColors } from '@/theme';

const createHomeStyles = (colors: ThemeColors) => {
  return {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  };
};

export default createHomeStyles;