export const colors = {
  primary: '#FF6B35',
  secondary: '#004E89',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#212529',
  textSecondary: '#6C757D',
  border: '#DEE2E6',
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  gray: '#6C757D',
  lightGray: '#E9ECEF',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type Colors = typeof colors;