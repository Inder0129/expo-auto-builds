import { ThemeColors } from '@/theme';

const createButtonGridStyles = (colors: ThemeColors) => {
  return {
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    button: {
      width: 80,
      height: 80,
      margin: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 24,
      fontFamily: 'regular',
      color: colors.text,
    },
  };
};

export default createButtonGridStyles;