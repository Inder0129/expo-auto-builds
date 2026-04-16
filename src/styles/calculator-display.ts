import { ThemeColors } from '@/theme';
import { moderateScaleFactor, spacing, fontSize, fontFamily } from '@/theme';

const createCalculatorDisplayStyles = (colors: ThemeColors) => {
  return {
    container: {
      width: '100%',
      padding: spacing[2],
      backgroundColor: colors.background,
      borderColor: colors.border,
      borderWidth: 1,
    },
    result: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.regular,
      color: colors.text,
    },
    currentNumber: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.bold,
      color: colors.primary,
    },
  };
};

export default createCalculatorDisplayStyles;