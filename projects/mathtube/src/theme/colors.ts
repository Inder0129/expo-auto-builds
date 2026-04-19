export const colors = {
  primary: '#3B82F6',
  secondary: '#10B981',
  accent: '#8B5CF6',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#111827',
  textSecondary: '#6B7280',
  gray: '#9CA3AF',
  lightGray: '#E5E7EB',
  border: '#D1D5DB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  black: '#000000',
  white: '#FFFFFF',
} as const;

export type Colors = typeof colors;