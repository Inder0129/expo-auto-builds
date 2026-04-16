import { ThemeColors } from '@/theme';

const createDisplayStyles = (colors: ThemeColors) => {
  return {
    text: {
      fontSize: 24,
      fontFamily: 'bold',
      color: colors.text,
    },
  };
};

export { createDisplayStyles };