import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8
  }
});