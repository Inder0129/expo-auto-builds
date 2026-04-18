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
    paddingBottom: 16,
    alignItems: 'center'
  },
  orderId: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4
  },
  timeRemaining: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary
  },
  statusContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  deliveryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  restaurantInfo: {
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  orderDetails: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  infoContent: {
    marginLeft: 12,
    flex: 1
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary
  },
  detailValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500'
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary
  }
});