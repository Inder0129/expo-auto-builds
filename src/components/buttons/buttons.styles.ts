import { ThemeColors } from '@/theme';

const createButtonsStyles = (colors: ThemeColors) => {
  return {
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  };
};

export { createButtonsStyles };