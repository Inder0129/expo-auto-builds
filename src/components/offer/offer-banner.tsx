import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/src/theme';

interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
}

interface OfferBannerProps {
  offer: Offer;
  onPress: () => void;
  style?: ViewStyle;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({ offer, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>
        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Use code:</Text>
          <Text style={styles.code}>{offer.code}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    color: colors.background,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.bodySmall,
    color: colors.background,
    opacity: 0.9,
    marginBottom: spacing.md,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeLabel: {
    ...typography.caption,
    color: colors.background,
    marginRight: spacing.xs,
  },
  code: {
    ...typography.body,
    color: colors.background,
    fontWeight: 'bold',
  },
});
