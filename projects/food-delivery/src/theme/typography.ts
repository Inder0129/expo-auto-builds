import { TextStyle } from 'react-native';

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as TextStyle['fontWeight'],
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal' as TextStyle['fontWeight'],
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 24,
  },
} as const;

export type Typography = typeof typography;