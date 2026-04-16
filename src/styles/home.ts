import { ThemeColors } from '@/theme';
import { moderateScaleFactor, spacing } from '@/theme';

const createHomeStyles = (colors: ThemeColors) => {
  return {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing[4],
    },
  };
};

export default createHomeStyles;