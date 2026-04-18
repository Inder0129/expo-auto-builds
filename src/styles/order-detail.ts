import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

export const orderDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerCard: {
    margin: 16,
    padding: 16,
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  statusSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  infoCard: {
    margin: 16,
    marginTop: 8,
    padding: 16,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
});
