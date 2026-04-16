import { ThemeColors } from '@/theme';
import { moderateScaleFactor, spacing, fontSize, fontFamily } from '@/theme';

const createButtonRowStyles = (colors: ThemeColors) => {
  return {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: spacing[2],
    },
    button: {
      width: moderateScaleFactor(60),
      height: moderateScaleFactor(40),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderColor: colors.border,
      borderWidth: 1,
      marginHorizontal: spacing[1],
    },
    buttonText: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.regular,
      color: colors.text,
    },
  };
};

export default createButtonRowStyles;