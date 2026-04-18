import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/src/theme';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  validUntil: string;
  terms: string[];
}

interface OfferCardProps {
  offer: Offer;
  isApplied: boolean;
  onApply: () => void;
  onRemove: () => void;
}

export const OfferCard: React.FC<OfferCardProps> = (props: OfferCardProps) => {
  const { offer, isApplied, onApply, onRemove } = props;

  return (
    <View style={[styles.container, isApplied && styles.appliedContainer]}>
      <View style={styles.header}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{offer.discount}</Text>
        </View>
        <Text style={styles.code}>Use code: {offer.code}</Text>
      </View>
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.description}>{offer.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.validUntil}>Valid until: {offer.validUntil}</Text>
        <TouchableOpacity
          style={[styles.button, isApplied && styles.removeButton]}
          onPress={isApplied ? onRemove : onApply}
        >
          <Text style={[styles.buttonText, isApplied && styles.removeButtonText]}>
            {isApplied ? 'Remove' : 'Apply'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  appliedContainer: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  discountBadge: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  discountText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  code: {
    fontSize: 14,
    color: colors.muted,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  validUntil: {
    fontSize: 12,
    color: colors.muted,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  removeButton: {
    backgroundColor: colors.errorLight,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  removeButtonText: {
    color: colors.error,
  },
});
