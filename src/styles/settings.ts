import { ThemeColors } from '@/theme';

const createSettingsStyles = (colors: ThemeColors) => {
  return {
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontFamily: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
  };
};

export default createSettingsStyles;