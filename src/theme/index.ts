import { ThemeColors } from './types';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';

const lightTheme: ThemeColors = { ...colors.light, ...typography, ...spacing };
const darkTheme: ThemeColors = { ...colors.dark, ...typography, ...spacing };

const theme = { light: lightTheme, dark: darkTheme };
export default theme;