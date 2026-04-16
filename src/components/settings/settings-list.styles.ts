import { moderateScaleFactor, spacing, fontSize, fontFamily } from '@/theme';
import { ThemeColors } from '@/theme/colors';

const createSettingsListStyles = (colors: ThemeColors) => {
  return {
    container: {
      marginTop: spacing[2],
    },
    item: {
      fontSize: fontSize.regular,
      fontFamily: fontFamily.regular,
      marginBottom: spacing[2],
    },
  };
};

export default createSettingsListStyles;