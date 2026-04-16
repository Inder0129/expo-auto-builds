import { ThemeColors } from '@/theme';

const createSettingSliderStyles = (colors: ThemeColors) => {
  return {
    container: {
      flexDirection: 'column',
      padding: 8,
    },
    label: {
      fontSize: 16,
      fontFamily: 'regular',
      color: colors.text,
      marginBottom: 4,
    },
    slider: {
      height: 20,
    },
    value: {
      fontSize: 16,
      fontFamily: 'regular',
      color: colors.text,
      marginTop: 4,
    },
  };
};

export default createSettingSliderStyles;