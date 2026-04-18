import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const exploreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sortText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  filtersList: {
    gap: 12,
    paddingVertical: 4,
  },
  restaurantsGrid: {
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
  },
  restaurantItem: {
    flex: 1,
    maxWidth: '48%',
  },
});
