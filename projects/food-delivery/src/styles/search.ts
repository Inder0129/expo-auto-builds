import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12
  },
  suggestionsList: {
    paddingHorizontal: 16
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  suggestionText: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.textPrimary
  },
  recentContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary
  },
  clearText: {
    fontSize: 14,
    color: colors.primary
  },
  recentList: {
    paddingBottom: 20
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  recentText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.textSecondary
  }
});