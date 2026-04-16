import { ThemeColors } from '@/theme';

const createCalculatorDisplayStyles = (colors: ThemeColors) => {
  return {
    display: {
      fontSize: 48,
      fontFamily: 'bold',
      color: colors.text,
    },
  };
};

export default createCalculatorDisplayStyles;