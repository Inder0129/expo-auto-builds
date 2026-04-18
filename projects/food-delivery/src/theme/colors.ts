export const colors = {
  primary: '#FF6B35',
  secondary: '#FFA500',
  background: '#FFFFFF',
  surface: '#F8F8F8',
  text: '#333333',
  textSecondary: '#666666',
  border: '#E0E0E0',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  info: '#007AFF',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8E8E93',
  grayLight: '#D1D1D6',
  grayDark: '#3C3C43',
} as const;

export type Colors = typeof colors;