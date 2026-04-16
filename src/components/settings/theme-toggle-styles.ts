import { ThemeColors } from '@/theme/colors';

export const createThemeToggleStyles = (colors: ThemeColors) => {
  return {
    trackColorFalse: colors.secondary,
    trackColorTrue: colors.primary,
    thumbColor: colors.surface
  };
};
