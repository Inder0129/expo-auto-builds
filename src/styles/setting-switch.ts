import { ThemeColors } from '@/theme';

const createSettingSwitchStyles = (colors: ThemeColors) => {
  return {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
    },
    label: {
      fontSize: 16,
      fontFamily: 'regular',
      color: colors.text,
    },
  };
};

export default createSettingSwitchStyles;