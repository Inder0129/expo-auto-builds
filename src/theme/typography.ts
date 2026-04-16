import { moderateScaleFactor } from './index';

export const typography = {
  h1: {
    fontSize: moderateScaleFactor(32),
    fontWeight: 'bold' as const
  },
  h2: {
    fontSize: moderateScaleFactor(24),
    fontWeight: 'bold' as const
  },
  h3: {
    fontSize: moderateScaleFactor(20),
    fontWeight: '600' as const
  },
  body: {
    fontSize: moderateScaleFactor(16),
    fontWeight: 'normal' as const
  },
  caption: {
    fontSize: moderateScaleFactor(14),
    fontWeight: 'normal' as const
  },
  button: {
    fontSize: moderateScaleFactor(16),
    fontWeight: '600' as const
  }
};