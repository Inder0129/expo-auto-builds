import { moderateScaleFactor, spacing, fontSize, fontFamily } from '@/theme';
import { ThemeColors } from '@/theme/colors';

const createSettingsStyles = (colors: ThemeColors) => {
  return {
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing[4],
    },
  };
};

export default createSettingsStyles;